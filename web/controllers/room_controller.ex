defmodule OekakiDengonGame.RoomController do
  use OekakiDengonGame.Web, :controller
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room

  plug :action

  def create(conn, _params) do
    room_info = _params
    IO.inspect room_info["userName"]
    rooms = Repo.all(Room)
    render(conn, "create.json", rooms: rooms)
  end
end
