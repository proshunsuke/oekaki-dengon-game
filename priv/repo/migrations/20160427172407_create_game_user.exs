defmodule OekakiDengonGame.Repo.Migrations.CreateGameUser do
  use Ecto.Migration

  def change do
    create table(:game_users) do
      add :game_order, :integer, null: false
      add :game_id, references(:games), null: false
      add :user_id, references(:users), null: false

      timestamps
    end
    create index(:game_users, [:game_id])
    create index(:game_users, [:user_id])

  end
end
