defmodule OekakiDengonGame.Room do
  use OekakiDengonGame.Web, :model

  schema "rooms" do
    field :name, :string
    field :draw_time, :integer
    field :status, :string
    field :password, :string
    timestamps
  end

  @required_fields ~w(name draw_time status password)
  @optional_fields ~w()

  @draw_time_5 5
  @draw_time_60 60
  @draw_time_120 120

  @waiting "waiting"

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
end
