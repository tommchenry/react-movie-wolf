# == Schema Information
#
# Table name: directors
#
#  id     :bigint           not null, primary key
#  name   :string
#  api_id :integer
#

class Director < ApplicationRecord
  has_many :directors_movies
  has_many :movies, through: :directors_movies

  def get_movies
    url = "https://api.themoviedb.org/3/person/#{api_id}/movie_credits?language=en-US&api_key=#{api_key}" 
    response = HTTParty.get(url)
    return unless response
    movies_response = response["crew"].select do |crew|
      crew["department"] == "Directing"
    end
    movies_response.each do |movie|
      year = get_year_from_string(movie["release_date"])
      title = movie["title"]
      Movie.find_or_create_by(title: title, year: year)
    end
  end

  private

  def get_year_from_string(release_date)
    release_date.split("-").first
  end

  def api_key
    ENV.fetch("MOVIE_DB_API_KEY")
  end
end
