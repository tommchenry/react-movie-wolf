# == Schema Information
#
# Table name: directors
#
#  id   :bigint           not null, primary key
#  name :string
#

class Director < ApplicationRecord
  has_and_belongs_to_many :movies
end
