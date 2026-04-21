class User < ApplicationRecord
  include Rodauth::Rails.model

  STATUS_UNVERIFIED = 1
  STATUS_OPEN = 2

  before_validation :normalize_name_parts

  validates :email, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, allow_blank: true
  validates :email, uniqueness: { case_sensitive: false }, allow_blank: true

  def pending_verification?
    status_id == STATUS_UNVERIFIED
  end

  def verified?
    status_id == STATUS_OPEN
  end


  def full_name
    NameParts.join(first_name, last_name) || NameParts.join(*NameParts.from_email(email)) || email
  end

  private

  def normalize_name_parts
    self.first_name = NameParts.normalize(first_name)
    self.last_name = NameParts.normalize(last_name)
  end
end
