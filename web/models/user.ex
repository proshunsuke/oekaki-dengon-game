defmodule OekakiDengonGame.User do
  use OekakiDengonGame.Web, :model
	use Timex.Ecto.Timestamps

  schema "users" do
    field :name, :string
    field :role, :string
		field :joined_at, Timex.Ecto.DateTime
    belongs_to :room, OekakiDengonGame.Room
    timestamps
  end

  @required_fields ~w()
  @optional_fields ~w(name role room_id joined_at)

  @leader "leader"
  @general "general"

	# def is_leader? do
	# 	role == @leader
	# end

  def by_active_room_id(query, room_id) do
    from u in query,
    join: r in OekakiDengonGame.Room,
    on: r.id == u.room_id,
    where: r.status != ^OekakiDengonGame.Room.closed and r.id == ^room_id,
    select: u
  end

	def users_join_room(room_id) do
		OekakiDengonGame.User
    |> by_active_room_id(room_id)
    |> OekakiDengonGame.Repo.all
    |> Enum.map(&(Map.take(&1, [:id, :name, :role])))
	end

	# def old_user_by_room_id(room_id) do
	# 	from u in query,
	# 	join: r in OekakiDengonGame.Room,
	# 	on: r.id == u.room_id,
		
		
	# end

	# def users_join_room_with_leader(room_id, user) do
	# 	if user.is_leader? do
			
	# 	end
	# end
	
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

  def leader do
    @leader
  end

  def general do
    @general
  end
end
