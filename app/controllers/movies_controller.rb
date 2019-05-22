class MoviesController < ApiController

  # GET /movies
  def index
    @movies = Movie.all.sort_by(&:title)
    render json: @movies.to_json
  end

  # GET /movies/:id
  def show
    @movie = Movie.find(params[:id])
    render json: @movie.to_json(:include => { :directors=> { :only => [:id, :name] }})
  end
end
