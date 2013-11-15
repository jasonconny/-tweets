var ChachiTweets = ChachiTweets || {};
ChachiTweets.linksAdded = false;
ChachiTweets.stealthMode = true;

var $bodyEl, $chachi, $tweetBubble, $tweetContainer, tweetContent, tweetCharCount;

$bodyEl = $("body");
$chachi = $("#chachi");
$tweetBubble = $("#tweet-bubble");
$tweetContainer = $("#tweet");
tweetContent = $("#tweet").text();
splitTweet = tweetContent.split(" ");
tweetCharCount = tweetContent.length;

ChachiTweets.init = function() {
	if (!tweetContent) {
		$tweetContainer.text("Error");
	}

	if (ChachiTweets.stealthMode) {
		$bodyEl.addClass('stealth');
	}

	ChachiTweets.layout();
	ChachiTweets.hideURLbar();	
};

ChachiTweets.layout = function() {
	var bodyHeight, bodyWidth, bodyAspectRatio;
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
	if (!ChachiTweets.linksAdded) {
		ChachiTweets.addLinks();
	}
	ChachiTweets.verticallyCenterTweet();
};

ChachiTweets.setFontSize = function() {
	var currentFontSize, tweetBubbleHeight, tweetContainerHeight, sizeFactor, maxFontSize, maxWordLength, maxWordIndex, longestWord, longestWidth;
	currentFontSize = parseInt($tweetContainer.css("font-size"), 10);
	tweetBubbleHeight = $tweetBubble.height();
	tweetContainerHeight = $tweetContainer.height();
	maxWordLength = 1;

	if (tweetCharCount <= 5) {
		sizeFactor = 3;
	} else if (tweetCharCount <= 10) {
		sizeFactor = 4;
	} else if (tweetCharCount <= 20) {
		sizeFactor = 5;
	} else if (tweetCharCount <= 40) {
		sizeFactor = 6;
	} else if (tweetCharCount <= 60) {
		sizeFactor = 7;
	} else if (tweetCharCount <= 80) {
		sizeFactor = 8;
	} else if (tweetCharCount <= 100) {
		sizeFactor = 9;
	} else if (tweetCharCount <= 120) {
		sizeFactor = 10;
	} else if (tweetCharCount <= 140) {
		sizeFactor = 11;
	}
	maxFontSize = tweetBubbleHeight / sizeFactor;

	for (i=0; i < splitTweet.length; i++) {
		if (maxWordLength < splitTweet[i].length) {
			maxWordLength = splitTweet[i].length;
			maxWordIndex = i;
		}
	}
	 longestWord = '<span class="longest">' + splitTweet[maxWordIndex] + '</span>';
	tweetContent = tweetContent.replace(splitTweet[maxWordIndex], longestWord);

	if (currentFontSize <= maxFontSize) {
		do {
			currentFontSize++;
			$tweetContainer.css('font-size', currentFontSize + "px");
			longestWidth = $('.longest').width();
			console.log(longestWidth);
			tweetContainerHeight = $tweetContainer.height(); // recalcuate tweetContainer height on each iteration of font sizing
			console.log(tweetContainerHeight);
		} while (tweetContainerHeight < tweetBubbleHeight * .7 && longestWidth < $tweetContainer.width() && currentFontSize <= maxFontSize);
	} else {
		$tweetContainer.css('font-size', maxFontSize + "px");
	}

};

ChachiTweets.addLinks = function() {
	if (tweetContent.contains("http") || tweetContent.contains("#") || tweetContent.contains("@")) {
		for (i=0; i < splitTweet.length; i++) {
			var el = splitTweet[i];
			if (el.contains('http')) {
				var linkedURL = '<a href="' + el + '" target="_blank">' + el + '</a>';
				tweetContent = tweetContent.replace(el, linkedURL);
			} else if (el.contains('#')) {
				var linkedHashTag = '<a href="https://twitter.com/search?q=%23' + el.substr(1) + '&src=hash" target="_blank">' + el + '</a>';
				tweetContent = tweetContent.replace(el, linkedHashTag);
			} else if (el.contains('@')) {
				var linkedUserName = '<a href="https://twitter.com/' + el.substr(1) + '" target="_blank">' + el + '</a>';
				tweetContent = tweetContent.replace(el, linkedUserName);
			}
			$tweetContainer.html(tweetContent);
			ChachiTweets.linksAdded = true;
		}
	}
};

ChachiTweets.verticallyCenterTweet = function() {
	var tweetContainerHeight, chachiHeight, marginOffset;
	tweetContainerHeight = $tweetContainer.height();
	chachiHeight = $chachi.height();
	marginOffset = ((chachiHeight * .25) - (tweetContainerHeight * .5)) + "px";
	$tweetContainer.css("margin-top", marginOffset);
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