defmodule OekakiDengonGame.Repo.Migrations.CreateGame do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :draw_time, :integer, null: false
      add :room_id, references(:rooms), null: false

      timestamps
    end
    create index(:games, [:room_id])

  end
end
