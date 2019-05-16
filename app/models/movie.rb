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
end
