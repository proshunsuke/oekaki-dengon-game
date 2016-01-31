defmodule OekakiDengonGame.LobbyChannel do
  use OekakiDengonGame.Web, :channel

  def join("lobby" <> lobby_id, _params, socket) do
    {:ok, assign(socket, :lobby_id, lobby_id) }
  end

  def handle_in("join", params, socket) do
    broadcast! socket, "join", %{
      text: params["text"]
    }

    {:reply, :ok, socket}
  end
end