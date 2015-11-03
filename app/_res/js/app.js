var ChachiTweets = ChachiTweets || {};

ChachiTweets.linksAdded = false;
ChachiTweets.longestSet = false;
ChachiTweets.stealthMode = true;

var $body, $chachi, $tweetContainer, $tweet;

$body = $("body");
$chachi = $("#chachi");
$tweetContainer = $("#tweet-container");
$tweet = $("#tweet");

ChachiTweets.init = function() {

	if (ChachiTweets.stealthMode) {
		$body.addClass('stealth');
	}

	//ChachiTweets.getTweet();
	ChachiTweets.layout();
	//ChachiTweets.hideURLbar();
	//ChachiTweets.updateTweet();

};

ChachiTweets.getTweet = function() {
	$.ajax({
		url: 'get_tweets.php',
		type: 'GET',
		success: function(response) {
			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				if(response[0].text != ChachiTweets.rawTweet) {
					ChachiTweets.rawTweet = response[0].text;
					ChachiTweets.tweetContent = ChachiTweets.rawTweet;
					ChachiTweets.splitTweet = ChachiTweets.tweetContent.split(" ");
					ChachiTweets.tweetCharCount = ChachiTweets.tweetContent.length;
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

ChachiTweets.updateTweet = function() {
	window.setTimeout(function() {
		ChachiTweets.linksAdded = false;
		ChachiTweets.longestSet = false;
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

/*
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
*/

	ChachiTweets.setFontSize();

	//$tweet.html(ChachiTweets.tweetContent);

	//if (!ChachiTweets.linksAdded) {
	//	ChachiTweets.addLinks();
	//}
};

ChachiTweets.setFontSize = function() {
	$tweetContainer.textfill({
		maxFontPixels: 150,
		explicitWidth: $body.width(), // no idea why passing this in stops it from failing
		//debug: true,
		success: function() {
			console.log("success: " + $body.width());
		},
		fail: function() {
			console.log("fail: " + $body.width());
		}
	});
};

ChachiTweets.addLinks = function() {
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
			$tweet.html(ChachiTweets.tweetContent);
			ChachiTweets.linksAdded = true;
		}
	}
};

ChachiTweets.setLongestWord = function() {
	var maxWordLength = 1,
		maxWordIndex,
		longestWord;

	if (!ChachiTweets.longestSet) {
		for (i=0; i < ChachiTweets.splitTweet.length; i++) {
			if (maxWordLength < ChachiTweets.splitTweet[i].length) {
				maxWordLength = ChachiTweets.splitTweet[i].length;
				maxWordIndex = i;
			}
		}
		longestWord = '<span class="longest">' + ChachiTweets.splitTweet[maxWordIndex] + '</span>';
		ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(ChachiTweets.splitTweet[maxWordIndex], longestWord);
		$tweet.html(ChachiTweets.tweetContent);
		ChachiTweets.longestSet = true;
	}
};

ChachiTweets.hideURLbar = function() {
	setTimeout(scrollTo, 0, 0, 1);
};

$(document).ready(function() {

	ChachiTweets.init();
	
	$(window).resize(function() {
		ChachiTweets.layout();
	});
		
});