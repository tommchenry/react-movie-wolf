class MovieQuery
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def query_results
    if params[:sort] == "chrono"
      chronological_by_year(filtered_collection)
    elsif params[:sort] == "chrono-rev"
      chronological_by_year(filtered_collection).reverse
    else
      alphabetical_by_title(filtered_collection)
    end
  end

  def filtered_collection
    if params[:tag]
      tag_id = Tag.find_by(name: params[:tag]).id
      Movie.all.joins(:tags).where("tags.id = ?", tag_id)
    elsif params[:director]
      director_id = params[:director]
      Movie.all.joins(:directors).where("directors.id = ?", director_id)
    else
      Movie.all
    end
  end

  def chronological_by_year(collection)
    collection.sort_by(&:year)
  end

  def alphabetical_by_title(collection)
    collection.sort do |a, b| 
      title_without_article(a.title) <=> title_without_article(b.title)
    end
  end
  
  private

  def title_without_article(title)
    title.delete_prefix("A ")
    .delete_prefix("An ")
    .delete_prefix("The ")
  end
end
