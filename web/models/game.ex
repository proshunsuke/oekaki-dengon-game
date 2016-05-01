defmodule OekakiDengonGame.Game do
  use OekakiDengonGame.Web, :model
  use Timex.Ecto.Timestamps

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

  def next_order_game do
    
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
