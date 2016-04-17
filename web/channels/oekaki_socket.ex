defmodule OekakiDengonGame.OekakiSocket do
  use Phoenix.Socket

  channel "lobby", OekakiDengonGame.LobbyChannel
  channel "room:*", OekakiDengonGame.RoomChannel

  transport :websocket, Phoenix.Transports.WebSocket, check_origin: false

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
