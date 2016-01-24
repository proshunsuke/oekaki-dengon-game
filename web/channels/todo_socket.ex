defmodule OekakiDengonGame.TodoSocket do
  use Phoenix.Socket

  channel "todos:*", OekakiDengonGame.TodoChannel

  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end