Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    get 'movies/suggest', to: 'movies#suggest_movie'
    resources :movies
    resources :directors
  end
end
