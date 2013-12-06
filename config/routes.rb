Swipely::Application.routes.draw do

  root 'employee_pages#home'

  namespace :api, defaults: {format: :json} do
    resources :employees, only: [:index]
  end

end
