defmodule OekakiDengonGame.RoomController do
  use OekakiDengonGame.Web, :controller
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room
  alias OekakiDengonGame.User

  plug :action

  def fetch(conn, _params) do
    active_rooms = Room
    |> Room.active
    |> OekakiDengonGame.Repo.all

    IO.inspect active_rooms

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
          user_changeset = User.changeset(%User{}, user_params)
          case Repo.insert(user_changeset) do
            {:ok, user} ->
              data = %{room_id: room.id, user_id: user.id, user_name: user.name, role: user.role}
              conn
              |> render("create.json", data: data)
            {:error, user_changeset} ->
              render(conn, "create.json", rooms: Repo.all(Room))
          end
        {:error, room_changeset} ->
          render(conn, "create.json", rooms: Repo.all(Room))
    end
  end
end
