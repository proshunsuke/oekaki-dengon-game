defmodule OekakiDengonGame.Game do
  use OekakiDengonGame.Web, :model
  use Timex.Ecto.Timestamps

  schema "games" do
    field :draw_time, :integer
    belongs_to :room, OekakiDengonGame.Room
    has_many :game_users, OekakiDengonGame.GameUser

    timestamps
  end

  @required_fields ~w(draw_time room_id)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
