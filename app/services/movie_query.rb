class MovieQuery
  attr_reader :params

  def initialize(params)
    @params = params
  end

  def query_results
    if params[:sort] == "chrono"
      chronological_by_year(Movie.all)
    elsif params[:sort] == "chrono-rev"
      chronological_by_year(Movie.all).reverse
    else
      alphabetical_by_title(Movie.all)
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
