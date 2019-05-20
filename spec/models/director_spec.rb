require 'rails_helper'

RSpec.describe Director, type: :model do
  describe "initialize" do
    it "creates a director" do
      director = Director.new(name: "John Carpenter") 
      expect(director).to be_valid
    end
  end
end
