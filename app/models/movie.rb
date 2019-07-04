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

  scope :filter_by_director, -> (director) { joins(:directors).where("directors.id = ?", director) }
  scope :filter_by_tag, -> (tag) { joins(:tags).where("tags.id = ?",tag) }
  scope :filter_by_year, -> (year) { where("year = ?", year) }
  scope :filter_by_owned, -> (value) { where("is_owned = ?", value) }

  def get_api_info
    movie_response = movie_api_id ? get_movie_from_api_id : get_movie_from_title_and_year
    return if movie_response.nil?
    poster_path = movie_response["poster_path"]
    self.image_url = "https://image.tmdb.org/t/p/w500" + poster_path if poster_path.present?
    self.title = movie_response["title"]
    self.description = movie_response["overview"]
    self.movie_api_id = movie_response["id"]
    self.save!
    get_director
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

  def wishlist_link
    generate_wishlist_link
  end

  def as_json(options={})
    {
      id: self.id,
      title: self.title,
      year: self.year,
      is_owned: self.is_owned,
      image_url: self.image_url,
      description: self.description,
      wishlist_link: self.wishlist_link,
    }.merge(:directors => directors.as_json)
      .merge(:tags => tags.as_json)
  end

  private

  def get_movie_from_api_id
    url = "https://api.themoviedb.org/3/movie/#{movie_api_id}?api_key=#{api_key}&language=en-US"
    HTTParty.get(url)
  end

  def get_movie_from_title_and_year
    return unless title && year
    search_query = URI::encode(title)
    url = "https://api.themoviedb.org/3/search/movie?api_key=#{api_key}&language=en-US&query=#{search_query}&page=1&include_adult=false&year=#{year}"
    response = HTTParty.get(url)
    find_movie(response)
  end

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

  def generate_wishlist_link
    WishlistLink.new(title).generate
  end
end
