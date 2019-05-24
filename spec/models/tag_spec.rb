require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe "initialize" do
    it "creates a tag" do
      tag = Tag.new(name: "comfort")

      expect(tag).to be_valid
    end
  end

  describe "#movies" do
    it "allows a tag to encompass a collection of movies" do
      movie = Movie.new(title: "Heat")
      tag = Tag.new(name: "comfort")
      tag.movies << movie

      expect(tag.movies).to include(movie)
    end
  end
end
