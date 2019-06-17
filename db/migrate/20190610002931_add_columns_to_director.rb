class AddColumnsToDirector < ActiveRecord::Migration[5.2]
  def change
    add_column :directors, :image_url, :string
    add_column :directors, :biography, :text
  end
end
