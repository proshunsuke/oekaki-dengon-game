defmodule OekakiDengonGame.RoomView do
  use OekakiDengonGame.Web, :view

  def render("create.json", %{data: data}) do
    %{data: data}
  end

  def render("fetch.json", %{rooms: rooms}) do
    %{data: render_many(rooms, OekakiDengonGame.RoomView, "room.json")}
  end

  def render("room.json", %{room: room}) do
    %{id: room.id, name: room.name, status: room.status}
  end
end
