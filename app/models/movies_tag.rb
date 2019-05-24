# == Schema Information
#
# Table name: movies_tags
#
#  movie_id :bigint           not null
#  tag_id   :bigint           not null
#
# Indexes
#
#  index_movies_tags_on_movie_id  (movie_id)
#  index_movies_tags_on_tag_id    (tag_id)
#
# Foreign Keys
#
#  fk_rails_...  (movie_id => movies.id)
#  fk_rails_...  (tag_id => tags.id)
#

class MoviesTag < ApplicationRecord
  belongs_to :movie
  belongs_to :tag
end
