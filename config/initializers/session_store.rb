# frozen_string_literal: true

# Use a shared cookie domain when APP_HOST is known so subdomains (websocket host,
# API host, etc.) receive the session cookie automatically.
cookie_domain = if Rails.env.production?
  ENV["COOKIE_DOMAIN"].presence || begin
    host = ENV["APP_HOST"]&.split(":", 2)&.first
    host.present? ? ".#{host}" : nil
  end
end

Rails.application.config.session_store(
  :cookie_store,
  key: "_day_planner_session",
  secure: Rails.env.production?,
  same_site: :lax,
  domain: cookie_domain
)
