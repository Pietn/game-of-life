(function (width, height, canvas) {
	var tileSize = 10;
	var context = canvas.getContext('2d');
	var grid = createGrid();
	
	drawGrid();
	
	function drawTile(x, y, color) {
		context.fillStyle = color;
		context.fillRect (x * tileSize, y * tileSize, tileSize, tileSize);
	}
	
	function createGrid() {
		var grid = [];
		for (var h = 0; h < height; h++) {
			grid[h] = [];
			for (var w = 0; w < width; w++) {
				grid[h][w] = { 
					alive: false 
				};
				
				/* For testing */
				if (h === 0 || w === 0) {
					grid[h][w].alive = true;
				}
			}
		}
		return grid;
	}
	
	function drawGrid() {
		for (var h = 0; h < height; h++) {
			for (var w = 0; w < width; w++) {
				if (grid[h][w].alive) {
					drawTile(w, h, 'black');
				}
			}
		}
	}
})(60, 45, document.getElementById('c'));