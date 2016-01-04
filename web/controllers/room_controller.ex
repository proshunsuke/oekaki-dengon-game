defmodule OekakiDengonGame.RoomController do
  use OekakiDengonGame.Web, :controller
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room

  plug :action

  def create(conn, _params) do
    rooms = Repo.all(Room)
    render(conn, "create.json", rooms: rooms)
  end
end
