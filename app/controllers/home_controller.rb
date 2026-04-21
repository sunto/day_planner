# frozen_string_literal: true

class HomeController < InertiaController
  before_action :authenticate

  def index
    redirect_to settings_user_path
  end
end
