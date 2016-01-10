defmodule OekakiDengonGame.RoomController do
  use OekakiDengonGame.Web, :controller
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room

  plug :action

  def create(conn, _params) do
    room_info = _params
    room_params = %{
      name: _params["roomName"],
      draw_time: Room.draw_time_120,
      status: Room.waiting,
      password: _params["roomPassword"]
    }

    changeset = Room.changeset(%Room{}, room_params)
    case Repo.insert(changeset) do
        {:ok, changeset} ->
          conn
          |> render(conn, "create.json", rooms: Repo.all(Room))
        {:error, changeset} ->
          render(conn, "create.json", rooms: Repo.all(Room))
    end
  end
end
