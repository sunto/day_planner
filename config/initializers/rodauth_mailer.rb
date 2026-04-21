Rails.application.config.to_prepare do
  require_dependency Rails.root.join("app/mailers/application_mailer").to_s
  require_dependency Rails.root.join("app/mailers/rodauth_mailer").to_s
end
