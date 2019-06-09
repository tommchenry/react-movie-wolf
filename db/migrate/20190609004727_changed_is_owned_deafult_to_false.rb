class ChangedIsOwnedDeafultToFalse < ActiveRecord::Migration[5.2]
  def change
    change_column_default :movies, :is_owned, false
  end
end
