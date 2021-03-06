defmodule OekakiDengonGame.Router do
  use OekakiDengonGame.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", OekakiDengonGame do
    pipe_through :browser # Use the default browser stack

    get "/", TopController, :index
  end

  scope "/api", OekakiDengonGame do
    pipe_through :api

    get "/room", RoomController, :fetch
    post "/room", RoomController, :create
    post "/room/:room_id", RoomController, :enter
  end
end
