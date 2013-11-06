# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$bodyEl = $("body")
$tweetContainer = $("#chachi")
$tweetBubble = $("#tweet-bubble")
$tweetContent = $("#tweet")


init = () ->
	layout()
	hideURLbar()

layout = () ->
	bodyHeight = $bodyEl.height()
	bodyWidth = $bodyEl.width()
	bodyAspectRatio = bodyHeight / bodyWidth;

	if bodyAspectRatio < .625
		if bodyHeight > 200
			$tweetContainer.height(bodyHeight)
			$tweetContainer.width(bodyHeight * 1.6)
		else
			$tweetContainer.height(200)
			$tweetContainer.width(320)
	else
		$tweetContainer.removeAttr('style')

	# set font-size
	setFontSize()
	
	# vertically center text
	verticallyCenterTweet()

setFontSize = () ->
	currentFontSize = parseInt($tweetContent.css("font-size"), 10)
	maxFontSize = $tweetContainer.height() / 5.5
	incrementFontSize(currentFontSize) while $tweetContent.height() < $tweetBubble.height()

incrementFontSize = (currentFontSize) ->
	currentFontSize++
	$tweetContent.css('font-size', currentFontSize + "px")
	$tweetContent.height()

verticallyCenterTweet = () ->
	paddingOffset = (($tweetContainer.height() * .25) - ($tweetContent.height() * .5)) + "px"
	$tweetBubble.css("padding-top", paddingOffset)



hideURLbar = () -> setTimeout(scrollTo, 0, 0, 1)


$(document).ready ->
	init()	
	$(window).resize ->
		layout()