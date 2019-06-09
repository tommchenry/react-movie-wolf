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

  describe "#filter_by_director" do
    context "when a director is provided" do
      it "returns only movies with that tag" do
        movie_3 = Movie.create(title: "Heat")
        movie_2 = Movie.create(title: "Bad Boys")
        movie_1 = Movie.create(title: "Miami Vice")
        director = Director.create(name: "Michael Mann")
        movie_3.directors << director
        movie_1.directors << director

        scope_results = Movie.filter_by_director(director)

        expect(scope_results).to include(movie_1)
        expect(scope_results).to include(movie_3)
        expect(scope_results).not_to include(movie_2)
      end
    end
  end

  describe "#filter_by_tag" do
    context "when a tag is provided" do
      it "returns only movies with that tag" do
        movie_3 = Movie.create(title: "Deep Red")
        movie_2 = Movie.create(title: "Raising Arizona")
        movie_1 = Movie.create(title: "Suspiria")
        tag = Tag.create(name: "giallo")
        movie_3.tags << tag
        movie_1.tags << tag

        scope_results = Movie.filter_by_tag(tag)

        expect(scope_results).to include(movie_1)
        expect(scope_results).to include(movie_3)
        expect(scope_results).not_to include(movie_2)
      end
    end
  end

  describe "#filter_by_year" do
    context "when a year is provided" do
      it "returns only movies with that tag" do
        movie_3 = Movie.create(year: 1990)
        movie_2 = Movie.create(year: 1979)
        movie_1 = Movie.create(year: 1990)

        scope_results = Movie.filter_by_year(1990)

        expect(scope_results).to include(movie_1)
        expect(scope_results).to include(movie_3)
        expect(scope_results).not_to include(movie_2)
      end
    end
  end
end
