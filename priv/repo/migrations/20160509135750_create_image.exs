defmodule OekakiDengonGame.Repo.Migrations.CreateImage do
  use Ecto.Migration

  def change do
    create table(:images) do
      add :url, :text, null: false
      add :game_user_id, references(:game_users), null: false

      timestamps
    end
    create index(:images, [:game_user_id])

  end
end
