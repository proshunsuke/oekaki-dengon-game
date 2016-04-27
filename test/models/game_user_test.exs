defmodule OekakiDengonGame.GameUserTest do
  use OekakiDengonGame.ModelCase

  alias OekakiDengonGame.GameUser

  @valid_attrs %{game_order: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = GameUser.changeset(%GameUser{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = GameUser.changeset(%GameUser{}, @invalid_attrs)
    refute changeset.valid?
  end
end
