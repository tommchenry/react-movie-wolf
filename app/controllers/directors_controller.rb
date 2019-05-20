class DirectorsController < ApiController

  # GET /directors
  def index
    @directors = Director.all
    render json: @directors.to_json
  end

  # GET /directors/:id
  def show
    @director = Director.find(params[:id])
    render json: @director.to_json(:include => { :movies => { :only => [:id, :title, :year, :is_owned] }})
  end
end
