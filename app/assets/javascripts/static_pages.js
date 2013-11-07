var ChachiTweets = ChachiTweets || {};

$bodyEl = $("body");
$chachi = $("#chachi");
$tweetBubble = $("#tweet-bubble")
$tweetContainer = $("#tweet");
$tweetContent = $("#tweet").text();

ChachiTweets.init = function() {
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
	ChachiTweets.verticallyCenterTweet();
};

ChachiTweets.setFontSize = function() {
	var currentFontSize = parseInt($tweetContainer.css("font-size"), 10);
	var maxFontSize = $tweetContainer.height() / 5.5;
	do {
		currentFontSize++;
		$tweetContainer.css('font-size', currentFontSize + "px");
		$tweetContainer.height();
	} while ($tweetContainer.height() < $tweetBubble.height() * .7);
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