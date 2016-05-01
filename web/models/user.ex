defmodule OekakiDengonGame.User do
  use OekakiDengonGame.Web, :model
  use Timex.Ecto.Timestamps

  schema "users" do
    field :name, :string
    field :role, :string
    field :status, :string
    field :joined_at, Timex.Ecto.DateTime
    belongs_to :room, OekakiDengonGame.Room
    has_many :games, OekakiDengonGame.GameUser

    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(name role room_id joined_at status)

  # status
  @active "active"
  @inactive "inactive"

  # role
  @leader "leader"
  @general "general"

  def is_leader?(user) do
    user.role == @leader
  end

  def by_active_room_id(query, room_id) do
    from u in query,
      join: r in OekakiDengonGame.Room,
      on: r.id == u.room_id,
      where: r.status != ^OekakiDengonGame.Room.closed and r.id == ^room_id and u.status == @active
  end

  def users_join_room(room_id) do
    OekakiDengonGame.User
    |> by_active_room_id(room_id)
    |> OekakiDengonGame.Repo.all
    |> Enum.map(&(Map.take(&1, [:id, :name, :role])))
  end

  def order_by_joined_at_desc(query) do
    from u in query,
      order_by: u.joined_at
  end

  def limit(query, num) do
    from u in query,
      limit: ^num
  end
  
  def oldest_user_by_room_id(room_id) do
    OekakiDengonGame.User
    |> by_active_room_id(room_id)
    |> order_by_joined_at_desc
    |> limit(1)
    |> OekakiDengonGame.Repo.all
  end

  def users_join_room_with_leader(room_id, terminated_user) do
    if terminated_user|>is_leader? do
      oldest_user = List.first(oldest_user_by_room_id(room_id))
      unless is_nil(oldest_user) do
	user_changeset = changeset(oldest_user, %{role: @leader})
	user = OekakiDengonGame.Repo.update!(user_changeset)
      end
    end
    users_join_room(room_id)
  end
  
  def by_id(id) do
    OekakiDengonGame.Repo.get!(OekakiDengonGame.User, id)
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

  def active do
    @active
  end

  def inactive do
    @inactive
  end

  def leader do
    @leader
  end

  def general do
    @general
  end
end
