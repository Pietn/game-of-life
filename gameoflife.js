(function (width, height, canvas) {
	var tileSize = 10;
	var context = canvas.getContext('2d');
	
	drawTile(0, 0, 'blue');
	drawTile(3, 10, 'red');
	function drawTile(x, y, color) {
		context.fillStyle = color;
		context.fillRect (x * tileSize, y * tileSize, tileSize, tileSize);
	}
})(60, 45, document.getElementById('c'));