defmodule OekakiDengonGame.Repo.Migrations.AddJoinedAtToUsers do
  use Ecto.Migration

  def change do
		alter table(:users) do
      add :joined_at, :datetime
    end
  end
end
