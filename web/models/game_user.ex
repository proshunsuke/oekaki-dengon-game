defmodule OekakiDengonGame.GameUser do
  use OekakiDengonGame.Web, :model

  schema "game_users" do
    field :game_order, :integer
    belongs_to :game, OekakiDengonGame.Game
    belongs_to :user, OekakiDengonGame.User

    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(game_order)

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
