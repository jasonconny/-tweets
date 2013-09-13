class StaticPagesController < ApplicationController
  def home
  	  @twitter_status = TwitterStatus.new
	  @twitter_status.user = 'jasonconny'
	  @twitter_status.default_ttl = 1.minute
  end
end
