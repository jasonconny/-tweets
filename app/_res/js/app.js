var ChachiTweets = ChachiTweets || {};

ChachiTweets.linksAdded = false;
ChachiTweets.longestSet = false;
ChachiTweets.stealthMode = true;

var $bodyEl, $chachi, $tweetBubble, $tweetContainer;

$bodyEl = $("body");
$chachi = $("#chachi");
$tweetBubble = $("#tweet-bubble");
$tweetContainer = $("#tweet");

ChachiTweets.init = function() {

	if (ChachiTweets.stealthMode) {
		$bodyEl.addClass('stealth');
	}

	ChachiTweets.getTweet();
	ChachiTweets.hideURLbar();
	ChachiTweets.updateTweet();

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

					ChachiTweets.layout();
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
	bodyHeight = $bodyEl.height();
	bodyWidth = $bodyEl.width();
	bodyAspectRatio = bodyHeight / bodyWidth;

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

	//ChachiTweets.setFontSize();

	$tweetContainer.html(ChachiTweets.tweetContent);

	$tweetBubble.textfill({
		maxFontPixel: 0,
		success: function() {
			console.log("success")
		},
		fail: function() {
			console.log("fail")
		}
	});

	if (!ChachiTweets.linksAdded) {
		ChachiTweets.addLinks();
	}
};

ChachiTweets.setFontSize = function() {
	var currentFontSize, tweetBubbleHeight, tweetContainerHeight, sizeFactor, maxFontSize, maxWordLength, maxWordIndex, longestWord, longestWidth;
	currentFontSize = parseInt($tweetContainer.css("font-size"), 10);
	tweetBubbleHeight = $tweetBubble.height();
	tweetContainerHeight = $tweetContainer.height();
	maxWordLength = 1;

	if (!ChachiTweets.longestSet) {
		for (i=0; i < ChachiTweets.splitTweet.length; i++) {
			if (maxWordLength < ChachiTweets.splitTweet[i].length) {
				maxWordLength = ChachiTweets.splitTweet[i].length;
				maxWordIndex = i;
			}
		}
		longestWord = '<span class="longest">' + ChachiTweets.splitTweet[maxWordIndex] + '</span>';
		ChachiTweets.tweetContent = ChachiTweets.tweetContent.replace(ChachiTweets.splitTweet[maxWordIndex], longestWord);
		$tweetContainer.html(ChachiTweets.tweetContent);
		ChachiTweets.longestSet = true;
	}

	if (ChachiTweets.tweetCharCount <= 5) {
		sizeFactor = 3;
	} else if (ChachiTweets.tweetCharCount <= 10) {
		sizeFactor = 4;
	} else if (ChachiTweets.tweetCharCount <= 20) {
		sizeFactor = 5;
	} else if (ChachiTweets.tweetCharCount <= 40) {
		sizeFactor = 6;
	} else if (ChachiTweets.tweetCharCount <= 60) {
		sizeFactor = 7;
	} else if (ChachiTweets.tweetCharCount <= 80) {
		sizeFactor = 8;
	} else if (ChachiTweets.tweetCharCount <= 100) {
		sizeFactor = 9;
	} else if (ChachiTweets.tweetCharCount <= 120) {
		sizeFactor = 10;
	} else if (ChachiTweets.tweetCharCount <= 140) {
		sizeFactor = 11;
	}
	maxFontSize = tweetBubbleHeight / sizeFactor;

	if (currentFontSize <= maxFontSize) {
		do {
			currentFontSize++;
			$tweetContainer.css('font-size', currentFontSize + "px");
			longestWidth = $('.longest').width();
			tweetContainerHeight = $tweetContainer.height(); // recalcuate tweetContainer height on each iteration of font sizing
		} while (tweetContainerHeight < tweetBubbleHeight * .7 && longestWidth < $tweetContainer.width() && currentFontSize <= maxFontSize);
	} else {
		$tweetContainer.css('font-size', maxFontSize + "px");
	}

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
			$tweetContainer.html(ChachiTweets.tweetContent);
			ChachiTweets.linksAdded = true;
		}
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