var ChachiTweets = ChachiTweets || {};
ChachiTweets.linksAdded = false;

var $bodyEl, $chachi, $tweetBubble, $tweetContainer, $tweetContent;

$bodyEl = $("body");
$chachi = $("#chachi");
$tweetBubble = $("#tweet-bubble");
$tweetContainer = $("#tweet");
$tweetContent = $("#tweet").text();

ChachiTweets.init = function() {
	if (!$tweetContent) {
		$tweetContainer.text("Error");
	}

	ChachiTweets.layout();
	ChachiTweets.hideURLbar();	
};

ChachiTweets.layout = function() {
	var bodyHeight = $bodyEl.height();
	var bodyWidth = $bodyEl.width();
	var bodyAspectRatio = bodyHeight / bodyWidth;

	if (bodyAspectRatio < .625) {
		if (bodyHeight > 200) {
			$chachi.height(bodyHeight);
			$chachi.width(bodyHeight * 1.6);
		} else {
			$chachi.height(200);
			$chachi.width(320);
		}
	} else {
		$chachi.removeAttr('style');
	}

	ChachiTweets.setFontSize();
	if (!ChachiTweets.linksAdded) {
		ChachiTweets.addLinks();
	}
	ChachiTweets.verticallyCenterTweet();
};

ChachiTweets.setFontSize = function() {
	var currentFontSize = parseInt($tweetContainer.css("font-size"), 10);
	var maxFontSize = $tweetBubble.height() / 5.5;
	do {
		currentFontSize++;
		$tweetContainer.css('font-size', currentFontSize + "px");
		$tweetContainer.height();
	} while ($tweetContainer.height() < $tweetBubble.height() * .7 && currentFontSize <= maxFontSize);
};

ChachiTweets.addLinks = function() {
	if ($tweetContent.contains("http") || $tweetContent.contains("#") || $tweetContent.contains("@")) {
		var splitTweet = $tweetContent.split(' ');
		for (i=0; i < splitTweet.length; i++) {
			var el = splitTweet[i];
			if (el.contains('http')) {
				var linkedURL = '<a href="' + el + '" target="_blank">' + el + '</a>';
				$tweetContent = $tweetContent.replace(el, linkedURL);
			} else if (el.contains('#')) {
				var linkedHashTag = '<a href="https://twitter.com/search?q=%23' + el.substr(1) + '&src=hash" target="_blank">' + el + '</a>';
				$tweetContent = $tweetContent.replace(el, linkedHashTag);
			} else if (el.contains('@')) {
				var linkedUserName = '<a href="https://twitter.com/' + el.substr(1) + '" target="_blank">' + el + '</a>';
				$tweetContent = $tweetContent.replace(el, linkedUserName);
			}
			$tweetContainer.html($tweetContent);
			ChachiTweets.linksAdded = true;
		}
	}
};

ChachiTweets.verticallyCenterTweet = function() {
	var tweetContainerHeight = $tweetContainer.height();
	var chachiHeight = $chachi.height();
	var paddingOffset = ((chachiHeight * .25) - (tweetContainerHeight * .5)) + "px";
	$tweetBubble.css("padding-top", paddingOffset);
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