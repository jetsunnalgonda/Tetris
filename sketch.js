var tetromino = [];
var game;

function setup() {
	// Create a new game
	game = new TetrisGame();

	console.log("New game created");
	console.log("game.gridSizeX = " + game.gridSizeX);
	console.log("game.gridSizeY = " + game.gridSizeY);

	// Create tetromino objects
	for (var i = 0; i <= 6; i++) {
		tetromino.push(new Tetromino(i));
	}
	// Draw playing field
	game.drawPlayingField();
	// setupPlayingField(300, 400);

	// tetromino[0].rotate();
	tetromino[0].pos.x = 1;
	tetromino[0].render();

	tetromino[1].pos.x = 4;
	tetromino[1].pos.y = 4;
	tetromino[1].rotate();
	tetromino[1].render();

	tetromino[2].pos.x = 12;
	tetromino[2].pos.y = 6;
	tetromino[2].render();

	tetromino[3].pos.x = 4;
	tetromino[3].pos.y = 10;
	tetromino[3].render();

	tetromino[4].pos.x = 10;
	tetromino[4].pos.y = 12;
	tetromino[4].render();

	tetromino[5].pos.x = 8;
	tetromino[5].pos.y = 37;
	tetromino[5].render();

	tetromino[6].pos.x = 8;
	tetromino[6].pos.y = 21;
	tetromino[6].rotate();
	tetromino[6].render();

}

// function setupPlayingField(w, h) {
// 	var border = 10;
// 	w = w + border + 1 - w % game.blockSize;
// 	h = h + border + 1 - h % game.blockSize;
// 	translate(20, 20);
// 	push()
// 	stroke(255);
// 	strokeWeight(border);
// 	noFill();
// 	rect(0, 0, w, h);
// 	pop();
// 	translate(border / 2, border / 2);
//
// }

function draw() {

}
