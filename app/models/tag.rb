class Tag < ApplicationRecord
  has_many :movies_tags
  has_many :movies, through: :movies_tags
end
