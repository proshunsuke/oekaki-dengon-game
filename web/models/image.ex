defmodule OekakiDengonGame.Image do
  use OekakiDengonGame.Web, :model
  use Timex.Ecto.Timestamps
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Image

  schema "images" do
    field :url, :string
    has_one :game_user, OekakiDengonGame.GameUser

    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(url game_user_id)

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
