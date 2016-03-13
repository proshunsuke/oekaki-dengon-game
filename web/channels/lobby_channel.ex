defmodule OekakiDengonGame.LobbyChannel do
  use OekakiDengonGame.Web, :channel

  def join("lobby", params, socket) do
    {:ok, assign(socket, :lobby, 'lobby') }
  end

  def handle_in("join", params, socket) do
    broadcast! socket, "join", %{
      text: params["text"]
    }

    {:reply, :ok, socket}
  end

  def terminate(_reason, socket) do
      {:ok, socket}
  end
end