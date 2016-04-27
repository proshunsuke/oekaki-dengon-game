defmodule OekakiDengonGame.Repo.Migrations.RemoveDrawTimeToRooms do
  use Ecto.Migration

  def change do
    alter table(:rooms) do
      remove :draw_time
    end
  end
end
