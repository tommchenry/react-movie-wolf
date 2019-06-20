# == Schema Information
#
# Table name: directors
#
#  id        :bigint           not null, primary key
#  biography :text
#  image_url :string
#  name      :string
#  api_id    :integer
#

class Director < ApplicationRecord
  has_many :directors_movies
  has_many :movies, through: :directors_movies

  after_create :get_api_info

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
      movie_api_id = movie["id"]
      Movie.find_or_create_by(title: title, year: year, movie_api_id: movie_api_id) if year
      sleep 1
    end
  end

  def get_api_info
    url = "https://api.themoviedb.org/3/person/#{api_id}?api_key=#{api_key}&language=en-US"
    response = HTTParty.get(url)
    self.image_url = "https://image.tmdb.org/t/p/w500" + response["profile_path"] if response["profile_path"]
    self.biography = response["biography"]
    self.save!
  end

  private

  def get_year_from_string(release_date)
    release_date.split("-").first if release_date
  end

  def api_key
    ENV.fetch("MOVIE_DB_API_KEY")
  end
end
