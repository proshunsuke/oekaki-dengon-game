defmodule OekakiDengonGame.OekakiSocket do
  use Phoenix.Socket

  channel "lobby", OekakiDengonGame.LobbyChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end