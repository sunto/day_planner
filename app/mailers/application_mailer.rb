class ApplicationMailer < ActionMailer::Base
  default from: -> { ENV["DEFAULT_FROM_EMAIL"].presence || "no-reply@resend.laterolabs.com" }
  layout nil
end
