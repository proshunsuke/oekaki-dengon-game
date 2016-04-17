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
		room = Repo.insert!(room_changeset)
		user_params = %{
      name: _params["userName"],
      role: User.leader,
      room_id: room.id
    }
    data = %{room_id: room.id}
    active_rooms = Room
    |> Room.active
    |> OekakiDengonGame.Repo.all
    |> Enum.map(&(Map.take(&1, [:id, :name, :draw_time, :status])))
    OekakiDengonGame.Endpoint.broadcast! "lobby", "create_room", %{
      rooms: active_rooms
    }
    conn
    |> render("create.json", data: data)
  end
end
