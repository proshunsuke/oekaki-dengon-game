defmodule OekakiDengonGame.Endpoint do
  use Phoenix.Endpoint, otp_app: :oekaki_dengon_game

  # ここを参考に
  # http://10consulting.com/2015/11/18/phoenix-react-redux-example/
  socket "/oekaki-ws", OekakiDengonGame.OekakiSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/", from: :oekaki_dengon_game, gzip: false,
    only: ~w(css fonts images js favicon.ico robots.txt)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  plug Plug.Session,
    store: :cookie,
    key: "_oekaki_dengon_game_key",
    signing_salt: "wMIuuM+M"

  plug OekakiDengonGame.Router
end
