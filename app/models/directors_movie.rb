# == Schema Information
#
# Table name: directors_movies
#
#  id          :bigint           not null, primary key
#  director_id :bigint           not null
#  movie_id    :bigint           not null
#
# Indexes
#
#  index_directors_movies_on_director_id  (director_id)
#  index_directors_movies_on_movie_id     (movie_id)
#

class DirectorsMovie < ApplicationRecord
  belongs_to :director
  belongs_to :movie
end
