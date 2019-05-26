require 'rails_helper'

RSpec.describe MovieQuery do
  describe "query_results" do
    context "when no params are provided" do
      let(:params) {{}}

      it "returns movies in alphabetical order" do
        movie_c = Movie.create(title: "Contact")
        movie_b = Movie.create(title: "Bee Movie")
        movie_a = Movie.create(title: "Adaptation.")
        alphabetical_order = [movie_a, movie_b, movie_c]

        query = MovieQuery.new(params)

        expect(query.query_results).to eq(alphabetical_order)
      end

      it "sorts without articles" do
        movie_c = Movie.create(title: "A Christmas Story")
        movie_b = Movie.create(title: "The Baxter")
        movie_a = Movie.create(title: "An American Tale")
        alphabetical_order = [movie_a, movie_b, movie_c]

        query = MovieQuery.new(params)

        expect(query.query_results).to eq(alphabetical_order)
      end
    end

    context "when the chronological parameter is provided" do
      let(:params) {{sort: "chrono"}}

      it "returns movies in chronological order" do
        movie_3 = Movie.create(year: 2019)
        movie_2 = Movie.create(year: 1981)
        movie_1 = Movie.create(year: 1977)
        chronological_order = [movie_1, movie_2, movie_3]

        query = MovieQuery.new(params)

        expect(query.query_results).to eq(chronological_order)
      end
    end

    context "when the reverse chronological parameter is provided" do
      let(:params) {{sort: "chrono-rev"}}

      it "returns movies in reverse chronological order" do
        movie_3 = Movie.create(year: 2019)
        movie_2 = Movie.create(year: 1981)
        movie_1 = Movie.create(year: 1977)
        reverse_chronological_order = [movie_3, movie_2, movie_1]

        query = MovieQuery.new(params)

        expect(query.query_results).to eq(reverse_chronological_order)
      end
    end

    context "when a tag is provided" do
      let(:params) {{tag: "giallo"}}

      it "returns only movies with that tag" do
        movie_3 = Movie.create(title: "Deep Red")
        movie_2 = Movie.create(title: "Raising Arizona")
        movie_1 = Movie.create(title: "Suspiria")
        tag = Tag.create(name: "giallo")
        movie_3.tags << tag
        movie_1.tags << tag

        query = MovieQuery.new(params)

        expect(query.query_results).to include(movie_1)
        expect(query.query_results).to include(movie_3)
        expect(query.query_results).not_to include(movie_2)
      end
    end

  end
end
