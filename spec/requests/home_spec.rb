require "rails_helper"

RSpec.describe "Home", type: :request do
  def sign_in(user)
    post "/login", params: { email: user.email, password: "password123" }
  end

  it "redirects signed-in users to profile settings" do
    user = User.create!(email: "owner@example.com", password: "password123", status_id: User::STATUS_OPEN)

    sign_in(user)
    get root_path

    expect(response).to redirect_to(settings_user_path)
  end
end
