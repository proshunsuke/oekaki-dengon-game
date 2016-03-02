defmodule OekakiDengonGame.User do
  use OekakiDengonGame.Web, :model

  schema "users" do
    field :name, :string
    field :role, :string
    belongs_to :room, OekakiDengonGame.Room
    timestamps
  end

  @required_fields ~w(name role room_id)
  @optional_fields ~w()

  @leader "leader"
  @general "general"

  def by_active_room_id(query, room_id) do
    from u in query,
    join: r in OekakiDengonGame.Room,
    on: r.id == ^room_id,
    where: r.status != ^OekakiDengonGame.Room.closed,
    select: u
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

  def leader do
    @leader
  end

  def general do
    @general
  end
end
