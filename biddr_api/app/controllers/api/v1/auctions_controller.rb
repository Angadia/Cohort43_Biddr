class Api::V1::AuctionsController < ApplicationController
  def create
    auction = Auction.new auction_params
    if auction.save
      render json: { id: auction.id }
    else
      render(
        json: { errors: auction.errors },
        status: 422 # Unprocessable Entity
      )
    end
  end

  def index
    auctions = Auction.order(created_at: :desc)
    render json: auctions, each_serializer: AuctionCollectionSerializer
  end

  def show
    auction = Auction.find(params[:id])
    render json: auction
  end

  private

  def auction_params
    params.require(:auction).permit(:title, :description, :ends_at, :reserve_price)
  end
end
