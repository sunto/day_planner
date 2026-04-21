# frozen_string_literal: true

class UserSettingsController < InertiaController
  before_action :authenticate
  def show
    render inertia: "settings/user", props: user_props
  end

  def update
    if current_user.update(user_params)
      redirect_to settings_user_path, notice: "Your settings were updated."
    else
      inertia_validation_toast(resource_name: "profile", errors: current_user.errors)

      render inertia: "settings/user", props: user_props(
        form: submitted_user_form,
        errors: current_user.errors.to_hash(true)
      ), status: :unprocessable_entity
    end
  end

  private

  def user_props(form: nil, errors: {})
    {
      form: {
        first_name: form_field(form, :first_name, current_user.first_name),
        last_name: form_field(form, :last_name, current_user.last_name),
        email: form_field(form, :email, current_user.email)
      },
      errors: errors
    }
  end

  def form_field(form, key, fallback)
    return fallback.to_s if form.blank?

    form[key.to_s] || form[key.to_sym] || fallback.to_s
  end

  def submitted_user_form
    p = user_params
    { first_name: p[:first_name], last_name: p[:last_name], email: p[:email] }
  end

  def user_params
    params.expect(user: %i[first_name last_name email])
  end
end
