var ChachiTweets = ChachiTweets || {};

ChachiTweets.stealthMode = false;

var $body, $chachi, $tweetBubble, $tweet;

$body = $("body");
$chachi = $("#chachi");
$tweetBubble = $("#tweet-bubble");
$tweet = $("#tweet");

ChachiTweets.init = function() {

	if (ChachiTweets.stealthMode) {
		$body.addClass('stealth');
	}

	ChachiTweets.getTweet();
	ChachiTweets.layout();
	ChachiTweets.hideURLbar();
	ChachiTweets.updateTweet();

};

ChachiTweets.getTweet = function() {
	$.ajax({
		url: 'get_tweets.php',
		type: 'GET',
		success: function(response) {
			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				if(response[0].text !== ChachiTweets.rawTweet) {
					ChachiTweets.rawTweet = response[0].text;
					ChachiTweets.formatTweet();
				}
			} else {
				console.log('error: ' + errors);
			}
		},
		error: function(errors) {
			console.log('error: ' + errors);
		}
	});
};

ChachiTweets.formatTweet = function() {
	ChachiTweets.tweetContent = ChachiTweets.rawTweet;
	ChachiTweets.splitTweet = ChachiTweets.tweetContent.split(" ");

	if (ChachiTweets.tweetContent.includes("http") || ChachiTweets.tweetContent.includes("#") || ChachiTweets.tweetContent.includes("@")) {
		for (i=0; i < ChachiTweets.splitTweet.length; i++) {
			var el = ChachiTweets.splitTweet[i];
			if (el.indexOf('http') === 0) {
				var linkedURL = '<a href="' + el + '" target="_blank">' + el + '</a>';
				ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(el, linkedURL);
			} else if (el.indexOf('#') === 0) {
				var linkedHashTag = '<a href="https://twitter.com/search?q=%23' + el.substr(1) + '&src=hash" target="_blank">' + el + '</a>';
				ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(el, linkedHashTag);
			} else if (el.indexOf('@') === 0) {
				var linkedUserName = '<a href="https://twitter.com/' + el.substr(1) + '" target="_blank">' + el + '</a>';
				ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(el, linkedUserName);
			}
		}
	}

	$tweet.html(ChachiTweets.tweetContent);

	ChachiTweets.setFontSize();
};

ChachiTweets.updateTweet = function() {
	window.setTimeout(function() {
		ChachiTweets.getTweet();
		ChachiTweets.updateTweet();
	}, 60000);
};

ChachiTweets.layout = function() {

	var bodyHeight, bodyWidth, bodyAspectRatio;
	bodyHeight = $body.height();
	bodyWidth = $body.width();
	bodyAspectRatio = bodyHeight / bodyWidth;

	if (bodyAspectRatio > 1) {
		$body.addClass('portrait');
		$body.removeClass('landscape');
	} else {
		$body.addClass('landscape');
		$body.removeClass('portrait');
	}

	if (bodyAspectRatio < .625) {
		if (bodyHeight > 200) {
			$chachi.height(bodyHeight * .95);
			$chachi.width(bodyHeight * 1.6);
		} else {
			$chachi.height(200);
			$chachi.width(320);
		}
	} else {
		$chachi.removeAttr('style');
	}


};

ChachiTweets.setFontSize = function() {
	$tweetBubble.textfill({
		maxFontPixels: 150,
		explicitWidth: $body.width() // no idea why passing this in stops it from failing
	});
};

ChachiTweets.hideURLbar = function() {
	setTimeout(scrollTo, 0, 0, 1);
};

$(document).ready(function() {

	ChachiTweets.init();
	
	$(window).resize(function() {
		ChachiTweets.layout();
		ChachiTweets.setFontSize();
	});
		
});