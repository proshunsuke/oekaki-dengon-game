defmodule OekakiDengonGame.RoomView do
  use OekakiDengonGame.Web, :view

  def render("create.json", %{rooms: rooms}) do
    %{data: render_many(rooms, OekakiDengonGame.RoomView, "room.json")}
  end

  def render("room.json", %{room: room}) do
     %{id: room.id, name: room.name}
  end
end
