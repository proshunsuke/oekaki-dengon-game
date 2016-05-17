defmodule OekakiDengonGame.RoomChannel do
  use OekakiDengonGame.Web, :channel
  use Timex
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room
  alias OekakiDengonGame.User
  alias OekakiDengonGame.GameUser
  alias OekakiDengonGame.Game
  alias OekakiDengonGame.Image

  def join("room:" <> room_id, params, socket) do
    if !Room.is_waiting_room?(room_id) do
      {:error, %{reason: "room is not waiting"}}
    else
      user_changeset = User.changeset(%User{}, user_params(params))
      user = Repo.insert!(user_changeset)
      data = %{room_id: params["roomId"], user_id: user.id, user_name: user.name, role: user.role}
      send(self, {:after_join, data})
      {:ok, assign(socket, :user_id, user.id)}	
    end
  end

  def handle_info({:after_join, data}, socket) do
    push socket, "joined", data
    {:noreply, socket}
  end

  def handle_in("other_joins", params, socket) do
    broadcast! socket, "other_joins", %{
      users: User.users_join_room(params["roomId"])
    }
    {:reply, :ok, socket}
  end

  def handle_in("now_setting", params, socket) do
    room_changeset = Room.changeset(Repo.get!(Room, room_id(socket.topic)), %{status: Room.setting})
    room = Repo.update!(room_changeset)
    active_room_objects = Room.active_room_objects
    broadcast! socket, "now_setting", active_room_objects
    OekakiDengonGame.Endpoint.broadcast! "lobby", "now_setting", active_room_objects
    {:reply, :ok, socket}
  end

  def handle_in("now_waiting", params, socket) do
    room_changeset = Room.changeset(Repo.get!(Room, room_id(socket.topic)), %{status: Room.waiting})
    room = Repo.update!(room_changeset)
    active_room_objects = Room.active_room_objects
    broadcast! socket, "now_waiting", active_room_objects
    OekakiDengonGame.Endpoint.broadcast! "lobby", "now_waiting", active_room_objects
    {:reply, :ok, socket}
  end

  def terminate(_reason, socket) do
    terminated_user = User.by_id(socket.assigns[:user_id])
    user_changeset = User.changeset(terminated_user, %{status: User.inactive})
    user = Repo.update!(user_changeset)
    users = User.users_join_room_with_leader(room_id(socket.topic), terminated_user)
    broadcast! socket, "other_leaves", %{users: users}
    if users == [] do
      room_changeset = Room.changeset(Repo.get!(Room, room_id(socket.topic)), %{status: Room.closed})
      room = Repo.update!(room_changeset)
      OekakiDengonGame.Endpoint.broadcast! "lobby", "close_room", Room.active_room_objects
    end
    {:ok, socket}
  end

  # ordersには描く順番で入っている
  # %{"draw_time" => 120, "orders" => [%{"id" => 476, "name" => "a", "role" => "leader"}]}
  def handle_in("game_start", params, socket) do
    game_changeset = Game.changeset(
      %Game{}, %{draw_time: params["draw_time"], room_id: String.to_integer(room_id(socket.topic)), status: Game.active})
    game = Repo.insert!(game_changeset)
    game_users =  GameUser.save_orders(params["orders"] , game.id)
    game_user =  Enum.find(game_users, fn game_user -> game_user.game_order == 0  end)
    game_changeset_update = Game.changeset(game, %{current_game_user_id: game_user.id})
    Repo.update!(game_changeset_update)
    Room.to_playing(room_id(socket.topic))
    active_room_objects = Room.active_room_objects
    broadcast! socket, "game_start", Map.put(params, :rooms, active_room_objects)
    OekakiDengonGame.Endpoint.broadcast! "lobby", "game_start", active_room_objects
    {:reply, :ok, socket}
  end

  def handle_in("next_user", params, socket) do
    image = Image.save(params["canvasUrl"], user_id(socket))
    room_with_active_users = Room.with_active_game_users(room_id(socket.topic))
    game = room_with_active_users.games |> List.first
    game_users = room_with_active_users.game_users
    next_game_user = Game.next_game_user(game, game_users)

    # IO.inspect OekakiDengonGame.PubSub.subscribers socket.topic
    IO.inspect socket.id
    
    # ここ一般化出来そう
    if is_nil(next_game_user) do
      Game.to_finished_by_room_id(room_id(socket.topic))
      Room.to_finished(room_id(socket.topic))
      active_room_objects = Room.active_room_objects
      broadcast! socket, "game_finished", %{rooms: active_room_objects}
      OekakiDengonGame.Endpoint.broadcast! "lobby", "game_finished", active_room_objects
      {:reply, :ok, socket}
    else
      next_order_game = Game.save_as_next_order_game(game, next_game_user)
      next_user_id = game_users |> Enum.find(fn gu -> gu.id == next_order_game.current_game_user_id end) |> Map.get(:user_id)

      # とりあえず全員に一旦送る方向にする
      # push socket, "previous_image", %{url: image.url}
      broadcast! socket, "next_user", %{next_user_id: next_user_id}
      {:reply, :ok, socket}
    end
  end
  
  defp user_params(params) do
    if params["isCreate"] do
      role = User.leader
    else
      role = User.general
    end
    user_params = %{
      name: params["userName"],
      role: role,
      status: User.active,
      room_id: params["roomId"],
      joined_at: DateTime.now
    }
  end

  # socketのtopicからroom_idを取る
  defp room_id(topic) do
    List.last(Regex.run(~r/^room:(\d{1,})$/, topic))		
  end

  defp user_id(socket) do
    socket |> Map.fetch!(:assigns) |> Map.fetch!(:user_id)    
  end
end
