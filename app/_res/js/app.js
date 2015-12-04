var ChachiTweets = ChachiTweets || {};

ChachiTweets.stealthMode = false;
ChachiTweets.verbose = false;

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
	ChachiTweets.splitTweet = ChachiTweets.tweetContent.split(" ")

	if (ChachiTweets.tweetContent.includes("http") || ChachiTweets.tweetContent.includes("#") || ChachiTweets.tweetContent.includes("@") || ChachiTweets.tweetContent.includes("RT")) {

		if (!ChachiTweets.verbose) {

			// remove re-tweet attribution
			if(ChachiTweets.tweetContent.indexOf('RT ') === 0) {
				ChachiTweets.tweetContent = ChachiTweets.tweetContent.substring(3);
				ChachiTweets.tweetContent = ChachiTweets.tweetContent.substring(ChachiTweets.tweetContent.indexOf(" ")+1);
			}

			// remove embedded links
			for (i=0; i < ChachiTweets.splitTweet.length; i++) {
				var thisWord = ChachiTweets.splitTweet[i];
				if (thisWord.startsWith('http')) {
					ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(thisWord, '');
				}
			}
		}

		// add <a>'s to embedded links, usernames and hash tags
		for (i=0; i < ChachiTweets.splitTweet.length; i++) {
			var thisWord = ChachiTweets.splitTweet[i];
			if (thisWord.startsWith('http')) {
				var linkedURL = '<a href="' + thisWord + '" target="_blank">' + thisWord + '</a>';
				ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(thisWord, linkedURL);
			} else if (thisWord.startsWith('#')) {
				var linkedHashTag = '<a href="https://twitter.com/search?q=%23' + thisWord.substr(1) + '&src=hash" target="_blank">' + thisWord + '</a>';
				ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(thisWord, linkedHashTag);
			} else if (thisWord.startsWith('@')) {
				var linkedUserName = '<a href="https://twitter.com/' + thisWord.substr(1) + '" target="_blank">' + thisWord + '</a>';
				ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(thisWord, linkedUserName);
			}
		}

	}

	$tweet.html("<span>" + ChachiTweets.tweetContent + "</span>");

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
			var chachiHeight = bodyHeight * .95;
			$chachi.height(chachiHeight);
			$chachi.width(chachiHeight * 1.6);
		} else {
			$chachi.height(200);
			$chachi.width(320);
		}
	} else {
		$chachi.removeAttr('style');
	}


};

ChachiTweets.setFontSize = function() {
	$tweet.textfill({
		maxFontPixels: 150
	});
};

ChachiTweets.hideURLbar = function() {
	setTimeout(function () {
		window.scrollTo(0, 1);
	}, 1000);
};

$(document).ready(function() {

	ChachiTweets.init();
	
	$(window).resize(function() {
		ChachiTweets.layout();
		ChachiTweets.setFontSize();
	});
		
});