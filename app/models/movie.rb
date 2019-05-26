# == Schema Information
#
# Table name: movies
#
#  id           :bigint           not null, primary key
#  title        :string
#  year         :integer
#  is_owned     :boolean
#  image_url    :string
#  description  :string
#  movie_api_id :integer
#

class Movie < ApplicationRecord
  has_many :directors_movies
  has_many :directors, through: :directors_movies

  has_many :movies_tags
  has_many :tags, through: :movies_tags

  after_create :get_api_info

  def get_api_info
    return unless title && year
    search_query = URI::encode(title)
    url = "https://api.themoviedb.org/3/search/movie?api_key=#{api_key}&language=en-US&query=#{search_query}&page=1&include_adult=false&year=#{year}"
    response = HTTParty.get(url)
    movie_response = find_movie(response)
    return if movie_response.nil?
    self.image_url = "https://image.tmdb.org/t/p/w500" + movie_response["poster_path"]
    self.title = movie_response["title"]
    self.description = movie_response["overview"]
    self.movie_api_id = movie_response["id"]
    self.save!
  end

  def get_director
    url = "https://api.themoviedb.org/3/movie/#{movie_api_id}?api_key=#{api_key}&append_to_response=credits"
    response = HTTParty.get(url)
    response["credits"]["crew"].each do |crew|
      if crew["job"] == "Director"
        director = create_director(crew)
        self.directors << director unless self.directors.include?(director)
      end
    end
  end

  private

  def create_director(crew)
    name = crew["name"]
    api_id = crew["id"]
    Director.find_or_create_by(name: name, api_id: api_id)
  end

  def api_key
    ENV.fetch("MOVIE_DB_API_KEY")
  end

  def find_movie(response)
    return if response["results"].nil?
    results_by_year = response["results"].select do |result|
      result["release_date"][0..3] == year.to_s
    end
    results_by_year.first
  end
end
