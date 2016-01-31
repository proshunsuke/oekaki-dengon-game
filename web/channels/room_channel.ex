defmodule OekakiDengonGame.RoomChannel do
  use OekakiDengonGame.Web, :channel

  def join("room:" <> room_id, _params, socket) do
    {:ok, assign(socket, :room_id, room_id) }
  end

  def handle_in("join", params, socket) do
    broadcast! socket, "join", %{
      text: params["text"]
    }

    {:reply, :ok, socket}
  end
end