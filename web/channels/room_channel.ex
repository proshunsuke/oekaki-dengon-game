defmodule OekakiDengonGame.RoomChannel do
  use OekakiDengonGame.Web, :channel
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room
  alias OekakiDengonGame.User

  def join("room:" <> room_id, params, socket) do
    {:ok, assign(socket, :room_id, room_id) }
  end

  def handle_in("join", params, socket) do
    users_join_room = User
        |> User.by_active_room_id(params["roomId"])
        |> OekakiDengonGame.Repo.all
        |> Enum.map(&(Map.take(&1, [:id, :name, :role])))
    IO.inspect users_join_room
    broadcast! socket, "join", %{
      users: users_join_room
    }
    {:reply, :ok, socket}
  end

  def terminate(_reason, socket) do
        IO.inspect 'leave lobby'
        IO.inspect _reason
        IO.inspect socket
        {:ok, socket}
    end
end