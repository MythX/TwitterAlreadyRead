$(function(){
	$('#cp1').colorpicker({
		format: 'hex'
	});
});

function changeColor() {
	var color = $('#cp1').val();
	console.log("color :" + color);
	localStorage.setItem("color-tweet", color);
	console.log("color :" + localStorage.getItem("color-tweet"));
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('a').addEventListener('click', changeColor);
});