defmodule OekakiDengonGame.Repo.Migrations.AddCurrentOrderToGames do
  use Ecto.Migration

  def change do
    alter table(:games) do
      add :current_order, :integer, null: false
    end
  end
end
