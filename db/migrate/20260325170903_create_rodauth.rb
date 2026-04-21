class CreateRodauth < ActiveRecord::Migration[8.1]
  def change
    enable_extension "citext"
    enable_extension "pgcrypto"

    create_table :users, id: :uuid do |t|
      t.citext :email, null: false
      t.check_constraint "email ~ '^[^,;@ \r\n]+@[^,@; \r\n]+\\.[^,@; \r\n]+$'", name: "valid_email"
      t.index :email, unique: true
      t.string :password_hash
      t.timestamps
    end
  end
end
