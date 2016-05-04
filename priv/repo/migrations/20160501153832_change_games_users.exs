defmodule OekakiDengonGame.Repo.Migrations.ChangeGamesUsers do
  use Ecto.Migration

  def change do
    alter table(:games) do
      remove :current_order
      add :current_game_user_id, references(:game_users)
      add :status, :string, null: false
    end

    alter table(:users) do
      add :status, :string, null: false
    end
  end
end
