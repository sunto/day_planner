require "rails_helper"

RSpec.describe ApplicationCable::Connection do
  include ActionCable::Connection::TestCase::Behavior

  tests described_class

  it "connects with a valid rodauth session" do
    user = User.create!(email: "user@example.com", password: "password123")

    connect session: { account_id: user.id, authenticated_by: [ "password" ] }

    expect(connection.current_user).to eq(user)
  end

  it "rejects anonymous connections" do
    expect do
      connect
    end.to raise_error(ActionCable::Connection::Authorization::UnauthorizedError)
  end
end
