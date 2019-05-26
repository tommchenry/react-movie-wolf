class AddPrimaryKeyToMoviesTags < ActiveRecord::Migration[5.2]
  def change
    add_column :movies_tags, :id, :primary_key
  end
end
