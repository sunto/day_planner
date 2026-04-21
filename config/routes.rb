Rails.application.routes.draw do
  mount ActionCable.server => "/cable"

  root "home#index"

  scope :settings, as: :settings do
    resource :user, only: %i[show update], controller: "user_settings"
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
