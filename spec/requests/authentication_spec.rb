require "rails_helper"

RSpec.describe "Authentication", type: :request do
  def sign_in(user)
    post "/login", params: { email: user.email, password: "password123" }
  end

  describe "GET /login" do
    it "renders the login page with the server-rendered auth shell" do
      get "/login"

      expect(response).to have_http_status(:ok)
      expect(response.body).to include("Login")
      expect(response.body).to include("auth-card")
      expect(response.body).to include('action="/login"')
      expect(response.body).to include("Sign Up")
      expect(response.body).not_to include("Resend Verify Account Information")
    end

    it "redirects to the app root when already signed in" do
      user = User.create!(email: "user@example.com", password: "password123")

      sign_in(user)
      get "/login"

      expect(response).to redirect_to("/")
    end
  end

  describe "GET /create-account" do
    it "renders the create account page" do
      get "/create-account"

      expect(response).to have_http_status(:ok)
      expect(response.body).to include("Create account")
      expect(response.body).to include("Email")
      expect(response.body).to include('id="password"')
      expect(response.body).to include('id="password-confirm"')
      expect(response.body).to include('value="Sign Up"')
      expect(response.body).to include('action="/create-account"')
      expect(response.body).to include(%(href="/login"))
      expect(response.body).not_to include("New account")
    end

    it "redirects to the app root when already signed in" do
      user = User.create!(email: "user@example.com", password: "password123")

      sign_in(user)
      get "/create-account"

      expect(response).to redirect_to("/")
    end
  end

  describe "GET /logout" do
    it "renders the logout page for authenticated users" do
      user = User.create!(email: "member@example.com", password: "password123")

      sign_in(user)
      get "/logout"

      expect(response).to have_http_status(:ok)
      expect(response.body).to include("Sign out")
      expect(response.body).to include('action="/logout"')
    end
  end

  describe "POST /login" do
    it "re-renders the form with field errors when credentials are invalid" do
      post "/login", params: { email: "", password: "" }

      expect(response).to have_http_status(:unauthorized)
      expect(response.body).to include("auth-card")
      expect(response.body).to include('id="login_error_message"')
      expect(response.body).to include("auth-error")
    end
  end

  describe "POST /create-account" do
    it "re-renders the form with field errors when the submission is invalid" do
      post "/create-account", params: {
        email: "bad",
        "email-confirm": "different@example.com",
        password: "password123",
        "password-confirm": "password123"
      }

      expect(response).to have_http_status(:unprocessable_entity)
      expect(response.body).to include("auth-card")
      expect(response.body).to include('id="login_error_message"')
      expect(response.body).to include("auth-error")
    end
  end
end
