use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :oekaki_dengon_game, OekakiDengonGame.Endpoint,
    secret_key_base: System.get_env("SECRET_KEY_BASE")

# Configure your database
config :oekaki_dengon_game, OekakiDengonGame.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "oekaki_dengon_game_prod",
  url: System.get_env("DATABASE_URL"),
  pool_size: 20
