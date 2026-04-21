require "sequel/core"

class RodauthMain < Rodauth::Rails::Auth
  configure do
    enable :create_account, :internal_request, :login, :logout, :verify_account, :webauthn, :webauthn_login, :webauthn_autofill

    db Sequel.postgres(extensions: :activerecord_connection, keep_reference: false)
    accounts_table :users
    rails_controller { RodauthController }
    title_instance_variable :@page_title
    account_password_hash_column :password_hash

    login_param "email"
    login_confirm_param "email-confirm"

    login_label "Email"
    create_account_link_text "Sign Up"
    create_account_button "Sign Up"

    webauthn_keys_table :user_webauthn_keys
    webauthn_user_ids_table :user_webauthn_user_ids
    webauthn_keys_account_id_column :user_id
    webauthn_rp_name "App Flow Starter"
    webauthn_setup_button "Add passkey"
    webauthn_auth_button "Use passkey"
    webauthn_remove_button "Remove passkey"
    webauthn_login_user_verification_additional_factor? true
    webauthn_setup_link_text "Add passkey"
    webauthn_auth_link_text "Use passkey"
    webauthn_remove_link_text "Remove passkey"
    webauthn_setup_notice_flash "Passkey added."
    webauthn_remove_notice_flash "Passkey removed."
    webauthn_setup_error_flash "Passkey could not be added."
    webauthn_auth_error_flash "Passkey authentication failed."
    webauthn_login_error_flash "Passkey sign-in failed."
    webauthn_remove_error_flash "Passkey could not be removed."
    webauthn_not_setup_error_flash "No passkey is set up for this account."

    # Passwords shorter than 8 characters are considered weak according to OWASP.
    password_minimum_length 8
    # bcrypt has a maximum input length of 72 bytes, truncating any extra bytes.
    password_maximum_bytes 72

    create_verify_account_email do
      ::RodauthMailer.verify_account(self.class.configuration_name, account_id, verify_account_key_value)
    end

    email_from do
      ENV["DEFAULT_FROM_EMAIL"].presence || "no-reply@resend.laterolabs.com"
    end

    verify_account_email_subject do
      "Verify your account"
    end

    login_redirect "/"
    logout_redirect { login_path }
    webauthn_setup_redirect "/settings/user"
    webauthn_remove_redirect "/settings/user"
  end

  # Rodauth normally collects the password only on the verify-account screen when
  # `verify_account_set_password?` is true. That matches invited users (no password yet)
  # but hides password fields on self-serve sign-up. Collect password at sign-up when the
  # account already has none; invited users still set a password when they open the link.
  def create_account_set_password?
    true
  end

  def verify_account_set_password?
    return false unless account

    hash = account[account_password_hash_column]
    hash = account[account_password_hash_column.to_s] if hash.nil?
    hash.nil? || hash.to_s.strip.empty?
  end

  def already_logged_in
    redirect(login_redirect)
  end

  # Rodauth's default is "Please login to continue" on redirect from protected pages.
  # We already show the login form; an error-styled toast reads like a failed attempt.
  # (Cannot use `error_flash` in `configure` — that DSL exists only on Feature.define, not Configuration.)
  def require_login_error_flash
    ""
  end

  private

  def _login_form_footer_links
    resend_path = verify_account_resend_path
    super.reject { |(_, link, _)| link == resend_path }
  end

  def _new_account(login)
    timestamp = Time.current

    super.merge(
      created_at: timestamp,
      updated_at: timestamp
    )
  end
end
