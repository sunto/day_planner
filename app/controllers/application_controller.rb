class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  helper_method :current_user

  private

  def current_user
    rodauth.rails_account
  end

  def authenticate
    rodauth.require_account
  end

  def inertia_validation_toast(resource_name:, errors:)
    messages = errors.full_messages.uniq
    return if messages.empty?

    set_inertia_toast(
      type: "error",
      title: "Couldn't save #{resource_name}",
      description: messages.join("\n"),
      now: true
    )
  end

  def set_inertia_toast(type:, title:, description: nil, now: false)
    flash_scope = now ? flash.now : flash
    flash_scope.inertia[:toast] = {
      type: type,
      title: title,
      description: description
    }.compact
  end
end
