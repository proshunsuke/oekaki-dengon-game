defmodule OekakiDengonGame.RoomController do
  use OekakiDengonGame.Web, :controller
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room
  alias OekakiDengonGame.User

  def fetch(conn, _params) do
    active_rooms = Room
    |> Room.active
    |> OekakiDengonGame.Repo.all
    render(conn, :fetch, rooms: active_rooms)
  end

  def create(conn, _params) do
    room_info = _params
    room_params = %{
      name: _params["roomName"],
      draw_time: Room.draw_time_120,
      status: Room.waiting,
      password: _params["roomPassword"]
    }

    room_changeset = Room.changeset(%Room{}, room_params)
    case Repo.insert(room_changeset) do
      {:ok, room} ->
        user_params = %{
          name: _params["userName"],
          role: User.leader,
          room_id: room.id
        }
        data = %{room_id: room.id}
        conn
        |> render("create.json", data: data)
      {:error, room_changeset} ->
        render(conn, "create.json", rooms: Repo.all(Room))
    end
  end
end
