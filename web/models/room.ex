defmodule OekakiDengonGame.Room do
  use OekakiDengonGame.Web, :model
	use Timex.Ecto.Timestamps

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
	@setting "setting"
  @closed "closed"

	def is_waiting_room?(room_id) do
		if OekakiDengonGame.Room
    |> waiting_room_by_id(room_id)
    |> OekakiDengonGame.Repo.all
		|> List.first
		|> is_nil,
		do: false, else: true
	end

	def waiting_room_by_id(query, room_id) do
		from r in query,
    where: r.status == ^waiting and r.id == ^room_id
	end
	
  def active(query) do
      from r in query,
      where: r.status != @closed
  end

	def active_rooms do
		OekakiDengonGame.Room
    |> active
    |> OekakiDengonGame.Repo.all
    |> Enum.map(&(Map.take(&1, [:id, :name, :draw_time, :status])))
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

	def setting do
		@setting
	end

  def closed do
    @closed
  end
end
