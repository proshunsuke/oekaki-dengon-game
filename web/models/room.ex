defmodule OekakiDengonGame.Room do
  use OekakiDengonGame.Web, :model

  schema "rooms" do
    field :name, :string
    field :draw_time, :integer
    field :status, :string
    field :password, :string
    has_many :users, OekakiDengonGame.User
    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(name draw_time status password)

  # draw_time
  @draw_time_5 5
  @draw_time_60 60
  @draw_time_120 120

  # states
  @waiting "waiting"
  @closed "closed"

  def active(query) do
      from r in query,
      where: r.status != @closed
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

  def draw_time_5 do
    @draw_time_5
  end

  def draw_time_60 do
    @draw_time_60
  end

  def draw_time_120 do
    @draw_time_120
  end

  def waiting do
    @waiting
  end

  def closed do
    @closed
  end
end
