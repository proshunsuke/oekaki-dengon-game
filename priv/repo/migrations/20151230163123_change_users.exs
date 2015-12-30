defmodule OekakiDengonGame.Repo.Migrations.ChangeUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :room_id, references(:rooms)
      remove :email
    end
  end
end
