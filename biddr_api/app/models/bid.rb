class Bid < ApplicationRecord
  belongs_to :auction

  validates :bid_amount, numericality: { greater_than_or_equal_to: 0 }
end
