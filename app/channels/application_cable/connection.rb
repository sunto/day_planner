# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_current_user
    end

    private

    def find_current_user
      user_id = request.session[:account_id]
      authenticated_by = request.session[:authenticated_by]

      reject_unauthorized_connection if user_id.blank? || authenticated_by.blank?

      User.find_by(id: user_id) || reject_unauthorized_connection
    end
  end
end
