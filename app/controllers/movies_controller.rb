class MoviesController < ApiController

  # GET /movies
  def index
    @movies = sorted_and_filtered_movies(params)
    render json: @movies.to_json
  end

  # GET /movies/:id
  def show
    @movie = Movie.find(params[:id])
    render json: @movie.to_json(:include => { :directors=> { :only => [:id, :name] }})
  end

  private

  def sorted_and_filtered_movies(params)
    MovieQuery.new(params).query_results
  end
end
