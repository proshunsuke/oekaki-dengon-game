defmodule OekakiDengonGame.RoomChannel do
  use OekakiDengonGame.Web, :channel
	use Timex
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room
  alias OekakiDengonGame.User

  def join("room:" <> room_id, params, socket) do
    user_changeset = User.changeset(%User{}, user_params(params))
    case Repo.insert(user_changeset) do
      {:ok, user} ->
        data = %{room_id: params["roomId"], user_id: user.id, user_name: user.name, role: user.role}
        send(self, {:after_join, data})
        {:ok, assign(socket, :user_id, user.id)}
      {:error, user_changeset} ->
        {:ng, assign(socket, :data, %{test: 'test'}) }
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

  def terminate(_reason, socket) do
		terminated_user = User.by_id(socket.assigns[:user_id])
    user_changeset = User.changeset(terminated_user, %{room_id: nil})
    case Repo.update(user_changeset) do
      {:ok, user} ->
				users = User.users_join_room_with_leader(room_id(socket.topic), terminated_user)
        broadcast! socket, "other_leaves", %{users: users}
        if users == [] do
          room_changeset = Room.changeset(Repo.get!(Room, room_id(socket.topic)), %{status: Room.closed})
          case Repo.update(room_changeset) do
            {:ok, room} -> 
             OekakiDengonGame.Endpoint.broadcast! "lobby", "close_room", %{
                rooms: Room.active_rooms
              }
            {:error, room_changeset} ->
              {:error, socket}
          end
        end
        {:ok, socket}
      {:error, user_changeset} ->
        {:error, socket}
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
      room_id: params["roomId"],
			joined_at: DateTime.now
    }
	end

	defp room_id(topic) do
		List.last(Regex.run(~r/^room:(\d{1,})$/, topic))		
	end
end
