<?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '59233414-VWvoWpqMxTPwALLKg79AeDobIcuxaJfcCV44Fkkgl';
$oauth_access_token_secret = '0PUnV20BSWxpeeyqt3mE3Jihdfzun5v5BF3M4JA4Q';
$consumer_key = 'NBQOO8QN1y5Af9epM9qs2w';
$consumer_secret = 'rOB8HOdt03jVEKtGzwVINCMzsHRNVXD5fx0PFRHhc4';

//$user_id = '59233414';
//$screen_name = 'jasonconny';

$user_id = '125481462';
$screen_name = 'RealRonHoward';

//$user_id = '248917209';
//$screen_name = 'hwinkler4real';

//$user_id = '82447359';
//$screen_name = 'scottbaio';

$count = 1;

$twitter_url = 'statuses/user_timeline.json';
$twitter_url .= '?user_id=' . $user_id;
$twitter_url .= '&screen_name=' . $screen_name;
$twitter_url .= '&count=' . $count;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret,				// 'API secret' on https://apps.twitter.com
	$user_id,						// User id (http://gettwitterid.com/)
	$screen_name,					// Twitter handle
	$count							// The number of tweets to pull out
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);

echo $tweets;

?>