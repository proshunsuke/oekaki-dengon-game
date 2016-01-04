defmodule OekakiDengonGame.Repo.Migrations.RemoveLeaderUserIdToRooms do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      remove :leader_user_id
    end
  end
end
