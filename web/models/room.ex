defmodule OekakiDengonGame.Room do
  use OekakiDengonGame.Web, :model
  use Timex.Ecto.Timestamps

  schema "rooms" do
    field :name, :string
    field :status, :string
    field :password, :string
    has_many :users, OekakiDengonGame.User
    has_many :games, OekakiDengonGame.Game
    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(name status password)

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

  def active_room_objects do
    active_rooms |> room_objects
  end

  def active_rooms do
    OekakiDengonGame.Room
    |> active
    |> OekakiDengonGame.Repo.all
    |> Enum.map(&(Map.take(&1, [:id, :name, :status])))
  end

  # roomモデルの結果を受け取る
  # 以下のような結果が返る
  # %{1: %{status: 'waiting', name: 'room1'}, 2: %{status: 'waiting', name: 'room2'}}
  def room_objects(rooms) do
    rooms |> Enum.reduce(%{}, fn e, acc -> Map.put(acc, Integer.to_string(e.id), %{"status" => e.status, "name" => e.name})  end)
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
