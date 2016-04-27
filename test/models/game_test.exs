defmodule OekakiDengonGame.GameTest do
  use OekakiDengonGame.ModelCase

  alias OekakiDengonGame.Game

  @valid_attrs %{draw_time: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Game.changeset(%Game{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Game.changeset(%Game{}, @invalid_attrs)
    refute changeset.valid?
  end
end
