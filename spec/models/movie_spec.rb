require 'rails_helper'

RSpec.describe Movie, type: :model do
  describe "initialize" do
    it "creates a movie" do
      movie = Movie.new(title: "Halloween", year: 1978, is_owned: true) 
      expect(movie).to be_valid
    end
  end
end
