defmodule OekakiDengonGame.RoomController do
  use OekakiDengonGame.Web, :controller
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Room

  plug :action

  def index(conn, _params) do
    rooms = Repo.all(Room)
    render conn, :index, rooms: rooms
  end
end
