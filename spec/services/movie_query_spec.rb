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
  end
end
