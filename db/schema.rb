# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_04_21_222227) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "citext"
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "account_verification_keys", id: :uuid, default: nil, force: :cascade do |t|
    t.datetime "email_last_sent", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.string "key", null: false
    t.datetime "requested_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  end

  create_table "user_webauthn_keys", primary_key: ["user_id", "webauthn_id"], force: :cascade do |t|
    t.datetime "last_use", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.string "public_key", null: false
    t.integer "sign_count", null: false
    t.uuid "user_id", null: false
    t.string "webauthn_id", null: false
    t.index ["user_id"], name: "index_user_webauthn_keys_on_user_id"
  end

  create_table "user_webauthn_user_ids", id: :uuid, default: nil, force: :cascade do |t|
    t.string "webauthn_id", null: false
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.citext "email", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "password_hash"
    t.integer "status_id", default: 2, null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.check_constraint "email ~ '^[^,;@ \r\n]+@[^,@; \r\n]+\\.[^,@; \r\n]+$'::citext", name: "valid_email"
  end

  add_foreign_key "account_verification_keys", "users", column: "id"
  add_foreign_key "user_webauthn_keys", "users"
  add_foreign_key "user_webauthn_user_ids", "users", column: "id"
end
