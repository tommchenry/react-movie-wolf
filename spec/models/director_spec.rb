require 'rails_helper'

RSpec.describe Director, type: :model do
  describe "initialize" do
    it "creates a director" do
      director = Director.new(name: "John Carpenter") 

      expect(director).to be_valid
    end
  end

  describe "#movies" do
    it "allows a director to have many movies" do
      director = Director.new(name: "John Carpenter") 
      movie = Movie.new(title: "Halloween", year: 1978, is_owned: true) 
      director.movies << movie

      expect(director.movies).to include(movie)
    end
  end
end
