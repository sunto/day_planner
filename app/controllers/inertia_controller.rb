# frozen_string_literal: true

class InertiaController < ApplicationController
  # Share data with all Inertia responses
  # see https://inertia-rails.dev/guide/shared-data
  inertia_share(
    user: -> { current_user&.as_json(only: %i[id email first_name last_name]) },
    starter_app: lambda {
      {
        name: ENV.fetch("APP_NAME", "App Flow Starter"),
        support_email: ENV.fetch("DEFAULT_FROM_EMAIL", "hello@example.com")
      }
    }
  )
end
