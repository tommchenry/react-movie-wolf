class CreateMoviesTags < ActiveRecord::Migration[5.2]
  def change
    create_join_table :movies, :tags do |t|
      t.index :tag_id
      t.index :movie_id
    end
  end
end
