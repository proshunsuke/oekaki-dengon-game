defmodule OekakiDengonGame.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :name, :string
      add :leader_user_id, references(:users)
      add :draw_time, :integer
      add :status, :string

      timestamps
    end
  end
end
