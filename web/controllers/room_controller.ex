defmodule OekakiDengonGame.RoomController do
  use OekakiDengonGame.Web, :controller
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room
  alias OekakiDengonGame.User

  def fetch(conn, _params) do
    json(conn, Room.active_room_objects)
  end

  def create(conn, _params) do
    room_params = %{
      name: _params["roomName"],
      status: Room.waiting,
      password: _params["roomPassword"]
    }

    room_changeset = Room.changeset(%Room{}, room_params)
    room = Repo.insert!(room_changeset)
    data = %{room_id: room.id}
    OekakiDengonGame.Endpoint.broadcast! "lobby", "create_room", Room.active_room_objects
    conn
    |> render("create.json", data: data)
  end
end
