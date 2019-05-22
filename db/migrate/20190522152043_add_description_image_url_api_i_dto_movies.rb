class AddDescriptionImageUrlApiIDtoMovies < ActiveRecord::Migration[5.2]
  def change
    add_column :movies, :image_url, :string
    add_column :movies, :description, :string
    add_column :movies, :movie_api_id, :integer
  end
end
