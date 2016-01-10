defmodule OekakiDengonGame.Repo.Migrations.AddPasswordToRooms do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      add :password, :string
    end
  end
end
