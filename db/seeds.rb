if Rails.env.production? && ENV["ALLOW_SEED_IN_PRODUCTION"] != "1"
  abort <<~MSG.squish
    Seeds are disabled in production. To run them intentionally, set ALLOW_SEED_IN_PRODUCTION=1
    (they include demo users and known passwords — not suitable for real deployments).
  MSG
end

user = User.find_or_initialize_by(email: "owner@example.com")
user.password = "password123" if user.new_record?
user.first_name ||= "Starter"
user.last_name ||= "Owner"
user.save!

puts "Seeded starter demo account: owner@example.com / password123"
