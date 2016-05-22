defmodule OekakiDengonGame.GameUser do
  use OekakiDengonGame.Web, :model
  use Timex.Ecto.Timestamps

  schema "game_users" do
    field :game_order, :integer
    belongs_to :game, OekakiDengonGame.Game
    belongs_to :user, OekakiDengonGame.User
    has_one :image, OekakiDengonGame.Image

    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(game_order game_id user_id)

  def save_orders(orders, game_id) do
    Enum.with_index(orders)
    |> Enum.map(fn e ->  save_order(e, game_id) end)
  end

  defp save_order(order_tuple, game_id) do
    game_user_changeset = changeset(%OekakiDengonGame.GameUser{},
      %{game_order: elem(order_tuple, 1), user_id: elem(order_tuple, 0)["id"], game_id: game_id})
    OekakiDengonGame.Repo.insert!(game_user_changeset)
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
