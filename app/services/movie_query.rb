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
    scopes = get_scopes_from_params

    scopes.reduce(default_scope) do |movie, (scope, args)|
      has_scope?(scope) ? movie.send(scope, args) : movie
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

  def default_scope
    Movie.all
  end

  def get_scopes_from_params
    scopes = {}
    params.each do |filter_name, arg|
      scope_name = "filter_by_#{filter_name}".to_sym
      scopes[scope_name] = arg
    end
    scopes
  end

  def has_scope?(scope_name)
    Movie.respond_to?(scope_name)
  end

  def title_without_article(title)
    title.delete_prefix("A ")
    .delete_prefix("An ")
    .delete_prefix("The ")
  end
end
