# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Bid.destroy_all
Auction.destroy_all

ActiveRecord::Base.connection.reset_pk_sequence!(:auctions)
ActiveRecord::Base.connection.reset_pk_sequence!(:bids)

10.times.map do
  a = Auction.create(
    title: Faker::Commerce.product_name,
    description: Faker::ChuckNorris.fact,
    reserve_price: rand(51..100),
    ends_at: Faker::Date.forward(days: 7),
    created_at: Date.today,
    updated_at: Date.today
  )

  if a.valid?
    bid_amount = 5
    a.bids = rand(0..5).times.map do
      Bid.new(
        bid_amount: bid_amount += 5,
        created_at: Date.today,
        updated_at: Date.today
      )
    end
  else
    puts "Failed to persist Auction instance due to #{a.errors.full_messages.join(', ')}"
  end
end

puts "Generated #{Auction.count} auctions using Faker"
puts "Generated #{Bid.count} bids using Faker"
