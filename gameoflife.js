(function (width, height, canvas) {
	var tileSize = 10;
	var context = canvas.getContext('2d');
	var grid = createGrid();
	
	grid[1][1].alive = true;
	grid[1][2].alive = true;
	grid[1][3].alive = true;
	
	updateGrid();
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
	
	function countNeighbors(x, y) {
		var l = x - 1; /* left x */
		if (l < 0) {
			l = width - 1;
		}
		
		var r = x + 1; /* right x */
		if (r > width - 1) {
			r = 0;
		}
		
		var t = y - 1; /* top y */
		if (t < 0) {
			t = height - 1;
		}
		
		var b = y + 1; /* bottom y */
		if (b > height - 1) {
			b = 0;
		}
		
		var count = 0;
		
		if(grid[t][l].alive) {
			count++;
		}
		if(grid[y][l].alive) {
			count++;
		}
		if(grid[b][l].alive) {
			count++;
		}
		
		if(grid[t][x].alive) {
			count++;
		}
		if(grid[b][x].alive) {
			count++;
		}
		
		if(grid[t][r].alive) {
			count++;
		}
		if(grid[y][r].alive) {
			count++;
		}
		if(grid[b][r].alive) {
			count++;
		}
		
		console.log(x, y, count);	
		return count;
	}
	
	function updateCell(x, y) {
		var neighbors = countNeighbors(x, y);
		if (grid[y][x].alive) {
			return {
				alive: neighbors === 2 || neighbors === 3
			};
		} else {
			return {
				alive: neighbors === 3
			};
		}
	}
	
	function updateGrid() {
		var newGrid = [];
		
		for (var h = 0; h < height; h++) {
			newGrid[h] = [];
			for (var w = 0; w < width; w++) {
				newGrid[h][w] = updateCell(w, h);
			}
		}
		
		grid = newGrid;
	}
})(5, 5, document.getElementById('c'));