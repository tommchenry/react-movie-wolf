# == Schema Information
#
# Table name: directors
#
#  id   :bigint           not null, primary key
#  name :string
#

class Director < ApplicationRecord
  has_many :directors_movies
  has_many :movies, through: :directors_movies
end
