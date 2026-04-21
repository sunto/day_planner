class AddVerifyAccountToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :status_id, :integer, null: false, default: 2

    create_table :account_verification_keys, id: false do |t|
      t.uuid :id, null: false, primary_key: true
      t.foreign_key :users, column: :id
      t.string :key, null: false
      t.datetime :requested_at, null: false, default: -> { "CURRENT_TIMESTAMP" }
      t.datetime :email_last_sent, null: false, default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
