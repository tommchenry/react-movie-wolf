class AddApiIdtoDirectors < ActiveRecord::Migration[5.2]
  def change
    add_column :directors, :api_id, :integer
  end
end
