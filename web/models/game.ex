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

  def save_as_next_order_game(game, next_game_user) do
    game_changeset = changeset(game, %{current_game_user_id: next_game_user |> Map.get(:id)})
    Repo.update!(game_changeset)
  end

  def next_game_user(game, game_users) do
    sorted_by_order_game_users = game_users
    |> Enum.sort(fn (gu1, gu2) -> gu1.game_order < gu2.game_order end)
    next_index = sorted_by_order_game_users
    |> Enum.find_index(fn gu -> game.current_game_user_id == gu.id  end)
    |> + 1
    sorted_by_order_game_users |> Enum.at(next_index)
  end

  def to_finished_by_room_id(room_id) do
    game = OekakiDengonGame.Game
    |> active_room_game(room_id)
    |> Repo.one
    game_changeset = changeset(game, %{status: @finished})
    Repo.update!(game_changeset)
  end

  defp active_room_game(query, room_id) do
    from g in query,
      where: g.status == @active and g.room_id == ^room_id
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
