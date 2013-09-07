module TwitterHelper
  def url_for_twit(user,status_id)
    "https://twitter.com/#{user}/status/#{status_id}"
  end
end