defmodule OekakiDengonGame.RoomChannel do
  use OekakiDengonGame.Web, :channel
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room
  alias OekakiDengonGame.User

  def join("room:" <> room_id, params, socket) do
    IO.inspect params
    if params["isCreate"] do
      role = User.leader
    else
      role = User.general
    end
    user_params = %{
      name: params["userName"],
      role: role,
      room_id: params["roomId"]
    }
    user_changeset = User.changeset(%User{}, user_params)
    case Repo.insert(user_changeset) do
      {:ok, user} ->
        data = %{room_id: params["roomId"], user_id: user.id, user_name: user.name, role: user.role}
        send(self, {:after_join, data})
        {:ok, assign(socket, :room_id, params["roomId"])}
      {:error, user_changeset} ->
        {:ng, assign(socket, :data, %{test: 'test'}) }
    end
  end

  def handle_info({:after_join, data}, socket) do
    push socket, "joined", data
    {:noreply, socket}
  end

  def handle_in("join", params, socket) do
    users_join_room = User
        |> User.by_active_room_id(params["roomId"])
        |> OekakiDengonGame.Repo.all
        |> Enum.map(&(Map.take(&1, [:id, :name, :role])))
    broadcast! socket, "join", %{
      users: users_join_room
    }
    {:reply, :ok, socket}
  end

  def terminate(_reason, socket) do
        {:ok, socket}
    end
end