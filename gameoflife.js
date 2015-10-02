(function (width, height, canvas, initialFields) {
    'use strict';
    var tileSize = 10;

    canvas.width = width * tileSize;
    canvas.height = height * tileSize;

    var context = canvas.getContext('2d');
    var grid = createGrid();

    var Color = {
        red: 0,
        green: 0,
        blue: 0,
        toString: function () {
            return 'rgb(' +
                this.red + ',' +
                this.green + ',' +
                this.blue + ')';
        }
    };

    addRandomTiles();
    drawGrid();

    setInterval(function () {
        updateGrid();
        drawGrid();
    }, 200);

    function drawTile(x, y, color) {
        context.fillStyle = color;
        context.fillRect (x * tileSize, y * tileSize, tileSize, tileSize);
    }

    function createGrid() {
        var newGrid = [];

        for (var h = 0; h < height; h++) {
            newGrid[h] = [];
            for (var w = 0; w < width; w++) {
                newGrid[h][w] = {
                    alive: false
                };
            }
        }
        return newGrid;
    }

    function drawGrid() {
        for (var h = 0; h < height; h++) {
            for (var w = 0; w < width; w++) {
                if (grid[h][w].alive) {
                    drawTile(w, h, grid[h][w].color.toString());
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

        var neighbors = [];

        if(grid[t][l].alive) {
            neighbors.push(grid[t][l]);
        }
        if(grid[y][l].alive) {
            neighbors.push(grid[y][l]);
        }
        if(grid[b][l].alive) {
            neighbors.push(grid[b][l]);
        }

        if(grid[t][x].alive) {
            neighbors.push(grid[t][x]);
        }
        if(grid[b][x].alive) {
            neighbors.push(grid[b][x]);
        }

        if(grid[t][r].alive) {
            neighbors.push(grid[t][r]);
        }
        if(grid[y][r].alive) {
            neighbors.push(grid[y][r]);
        }
        if(grid[b][r].alive) {
            neighbors.push(grid[b][r]);
        }

        return neighbors;
    }

    function updateCell(x, y) {
        var neighbors = countNeighbors(x, y);
        if (grid[y][x].alive) {
            return {
                alive: neighbors.length === 2 || neighbors.length === 3,
                color: grid[y][x].color
            };
        } else {
            var color = grid[y][x].color;
            if (neighbors.length === 3) {
                color = inheritColor(neighbors);
            }
            return {
                alive: neighbors.length === 3,
                color: color
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

    function randomColor() {
        var color = Object.create(Color);
        color.red = Math.floor(Math.random() * 256);
        color.green = Math.floor(Math.random() * 256);
        color.blue = Math.floor(Math.random() * 256);
        return color;
    }

    function averageColor(colors, color) {
        var result = colors[0][color];
        for (var i = 1; i < colors.length; i++) {
            if (Math.random() < 0.5) {
                result = colors[i][color];
            }
        }
        return result + Math.floor((Math.random() * 21) - 10);
    }

    function inheritColor(neighbors) {
        var colors = neighbors.map(function (neighbor) {
            return neighbor.color;
        });
        var color = Object.create(Color);
        color.red = averageColor(colors, 'red');
        color.green = averageColor(colors, 'green');
        color.blue = averageColor(colors, 'blue');
        return color;
    }

    function addRandomTiles() {
        for (var i = 0; i < initialFields; i++) {
            var y = Math.floor((Math.random() * height));
            var x = Math.floor((Math.random() * width));
            grid[y][x].alive = true;
            grid[y][x].color = randomColor();
        }
    }

})(50, 50, document.getElementById('c'), 500);