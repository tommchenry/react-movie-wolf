require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe "initialize" do
    it "creates a movie" do
      movie = Movie.new(title: "Halloween", year: 1978, is_owned: true) 

      expect(movie).to be_valid
    end
  end

  describe "#directors" do
    it "allows a movie to have a collection of directors" do
      movie = Movie.new(title: "Halloween", year: 1978, is_owned: true) 
      director = Director.new(name: "John Carpenter")
      movie.directors << director

      expect(movie.directors).to include(director)
    end
  end

  describe "#tags" do
    it "allows a movie to have a collection of tags" do
      movie = Movie.new(title: "Heat") 
      tag = Tag.new(name: "comfort")
      movie.tags << tag

      expect(movie.tags).to include(tag)
    end
  end
end
