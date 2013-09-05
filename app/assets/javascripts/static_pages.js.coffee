# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$bodyEl = $("body");
$tweetContainer = $("#chachi");
$tweetContent = $("#tweet");


init = () ->
	layout
	hideURLbar

layout = () ->
	h = $bodyEl.height();
	w = $bodyEl.width();
	r = h / w;
	if (r < .625) {
		$tweetContainer.height(h);
		$tweetContainer.width(h*1.6)
	} else {
		$tweetContainer.removeAttr('style');
	}

	# if (w <= 500) {
	# 	$tweetContent.css("font-size", "1em");
	# } else {
	#	fs = (((w - 400)/100) * .25) + 1;
	# 	$tweetContent.css("font-size", fs + "em");
	# }

	tH = $tweetContent.height();
	tCH = $tweetContainer.height();
	mO = ((tCH * .25) - (tH * .5)) + "px";
	$tweetContent.css("margin-top", mO);


hideURLbar = () -> setTimeout(scrollTo, 0, 0, 1);


$(document).ready(function() {

	init
	
	$(window).resize(function() {
		layout();
	});
		
});