require 'csv'
require 'net/http'

FILENAME = "https://s3.amazonaws.com/movie-wolf/movie_db.csv"

namespace :movies do
  desc "Generate movies from CSV file"
  task :import_from_csv => :environment do |t|
    tmp_file_name = "#{Rails.root}/tmp/movie_db.csv"

    uri = URI(FILENAME)
    resp = Net::HTTP.get(uri)
    open(tmp_file_name, "wb") do |file|
      file.write(resp)
    end
    puts "File Downloaded."

    CSV.foreach(tmp_file_name) do |csv|
      title = csv[0]
      year = csv[1]
      movie = Movie.find_by(title:title)
      unless movie
        movie = Movie.create(title:title, year: year, is_owned: true)
      end
    end
    puts "File Imported."
  end
end
