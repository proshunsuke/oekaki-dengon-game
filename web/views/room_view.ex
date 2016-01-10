defmodule OekakiDengonGame.RoomView do
  use OekakiDengonGame.Web, :view

  def render("create.json", %{data: data}) do
    %{data: data}
  end
end
