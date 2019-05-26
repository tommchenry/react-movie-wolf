class AddPrimaryKeyToDirectorsMovies < ActiveRecord::Migration[5.2]
  def change
    add_column :directors_movies, :id, :primary_key
  end
end
