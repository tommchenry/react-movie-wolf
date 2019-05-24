# == Schema Information
#
# Table name: tags
#
#  id   :bigint           not null, primary key
#  name :string           not null
#

class Tag < ApplicationRecord
  has_many :movies_tags
  has_many :movies, through: :movies_tags
end
