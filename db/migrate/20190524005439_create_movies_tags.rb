class CreateMoviesTags < ActiveRecord::Migration[5.2]
  def change
    create_join_table(:movies, :tags) do |t|
      t.references :movie, foreign_key: true, null: false
      t.references :tag, foreign_key: true, null: false
    end
  end
end
