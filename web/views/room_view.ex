defmodule OekakiDengonGame.RoomView do
  use OekakiDengonGame.Web, :view

  def render("index.json", %{rooms: rooms}) do
    %{id: 'id'}
  end
end
