class MoviesController < ApiController

  # GET /movies
  def index
    @movies = sorted_and_filtered_movies(params)
    render :json => @movies, :include => {:tags => {:only => [:id, :name]}, :directors => {:only => [:id, :name]}}, :except => [:created_at, :updated_at]
  end

  # GET /movies/:id
  def show
    @movie = Movie.find(params[:id])
    render json: @movie.to_json(:include => { :directors=> { :only => [:id, :name] }})
  end

  # GET /movies/suggest
  def suggest_movie
    @suggested_movie = Movie.filter_by_owned(true).sample
    render json: @suggested_movie.to_json(:include => {:tags => {:only => [:id, :name]}, :directors => {:only => [:id, :name]}}, :except => [:created_at, :updated_at])
  end

  private

  def sorted_and_filtered_movies(params)
    MovieQuery.new(params).query_results
  end
end
