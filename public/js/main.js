$(document).ready(function(){
	$("body").on('click', '.main-sample-list-item', function(){
		location.href="/view";
	});
});

function goBottom(){
	var targetOffset = $("#section1").offset().top;
	$('html,body').animate({scrollTop: targetOffset}, 500);
}