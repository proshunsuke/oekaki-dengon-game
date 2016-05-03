defmodule OekakiDengonGame.Game do
  use OekakiDengonGame.Web, :model
  use Timex.Ecto.Timestamps
  alias OekakiDengonGame.Repo

  schema "games" do
    field :draw_time, :integer
    field :status, :string
    field :current_game_user_id, :integer
    belongs_to :room, OekakiDengonGame.Room
    has_many :game_users, OekakiDengonGame.GameUser

    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(draw_time room_id current_game_user_id status)

  # status
  @active "active"
  @finished "finished"

  def save_as_next_order_game(game, game_users) do
    next_game_user_id = next_game_user_id(game.current_game_user_id, game_users)
    game_changeset = changeset(game, %{current_game_user_id: next_game_user_id})
    Repo.update!(game_changeset)
  end

  defp next_game_user_id(current_game_user_id, game_users) do
    next_index = game_users
    |> Enum.sort(fn (gu1, gu2) -> gu1.game_order < gu2.game_order end)
    |> Enum.find_index(fn gu -> current_game_user_id == gu.id  end)
    |> + 1
    game_users |> Enum.fetch!(next_index) |> Map.get(:id)
  end

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end

  def active do
    @active
  end

  def finished do
    @finished
  end
end
