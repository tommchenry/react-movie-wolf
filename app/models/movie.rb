# == Schema Information
#
# Table name: movies
#
#  id       :bigint           not null, primary key
#  title    :string
#  year     :integer
#  is_owned :boolean
#

class Movie < ApplicationRecord
  has_and_belongs_to_many :directors
end
