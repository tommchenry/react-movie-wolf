class MovieQuery
  def initialize(params)
    @params = params
  end

  def query_results
    alphabetical_by_title(Movie.all)
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
