var ChachiTweets = ChachiTweets || {};

$bodyEl = $("body");
$chachi = $("#chachi");
$tweetBubble = $("#tweet-bubble")
$tweetContainer = $("#tweet");

ChachiTweets.init = function() {
	ChachiTweets.layout();
	ChachiTweets.hideURLbar();	
};

ChachiTweets.layout = function() {
	bodyHeight = $bodyEl.height();
	bodyWidth = $bodyEl.width();
	bodyAspectRatio = bodyHeight / bodyWidth;

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
	var currentFontSize = parseInt($tweetContainer.css("font-size"), 10)
	maxFontSize = $tweetContainer.height() / 5.5
	do {
		currentFontSize++;
		$tweetContainer.css('font-size', currentFontSize + "px");
		$tweetContainer.height();
	} while ($tweetContainer.height() < $tweetBubble.height() * .7);
};

ChachiTweets.verticallyCenterTweet = function() {
	tweetContainerHeight = $tweetContainer.height();
	chachiHeight = $chachi.height();
	paddingOffset = ((chachiHeight * .25) - (tweetContainerHeight * .5)) + "px";
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