$(function(){
	$('#cp1').colorpicker({
		format: 'hex'
	});
});

function changeColor() {
	var color = $('#cp1').val();
	console.log("color :" + color);
	chrome.storage.sync.set({'color-tweet': color}, function() {
    	// Notify that we saved.
    	console.log('Settings saved');
  	});
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('a').addEventListener('click', changeColor);
});