defmodule OekakiDengonGame.Image do
  use OekakiDengonGame.Web, :model
  use Timex.Ecto.Timestamps
  alias OekakiDengonGame.Repo
  alias OekakiDengonGame.Image
  alias  OekakiDengonGame.GameUser

  schema "images" do
    field :url, :string
    belongs_to :game_user, OekakiDengonGame.GameUser

    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(url game_user_id)

  def save(url, user_id) do
    IO.inspect 'error here'
    game_user =  Repo.get_by!(GameUser, user_id: user_id)
    image_changeset = changeset(%Image{}, %{url: url, game_user_id: game_user.id})
    Repo.insert!(image_changeset)
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
end
