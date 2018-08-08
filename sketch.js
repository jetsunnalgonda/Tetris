var tetromino;
var game;

function setup() {
	// Create a new game
	game = new TetrisGame();

	console.log("New game created");
	console.log("game.gridSizeX = " + game.gridSizeX);
	console.log("game.gridSizeY = " + game.gridSizeY);

	tetromino = new Tetromino();
	tetromino.pos.x = floor(game.gridSizeX / 2);
	tetromino.pos.y = 0;
	tetromino.render();

}

function draw() {

		game.drawPlayingField();
		game.animate(tetromino);

		// checkKeys();

		if (tetromino.landed && !game.gameOver) {
			tetromino = new Tetromino();
			tetromino.pos.x = floor(game.gridSizeX / 2);
			tetromino.pos.y = 0;
			// tetromino.render();
			game.animate(tetromino);
			if (game.gameOver) {
				console.log("Game Over");
			}
		}

}

function checkKeys() {
	if (keyIsDown(LEFT_ARROW)) {
		game.animate(tetromino, 1);
	} else if (keyIsDown(RIGHT_ARROW)) {
		game.animate(tetromino, 2);
	} else if (keyIsDown(UP_ARROW)) {
		game.animate(tetromino, 3);
	} else if (keyIsDown(DOWN_ARROW)) {
		game.animate(tetromino, 4);
	}
}

function keyPressed() {
	if (game.gameOver) { return; }
  if (keyCode == LEFT_ARROW) {
    game.animate(tetromino, 1);
  } else if (keyCode == RIGHT_ARROW) {
    game.animate(tetromino, 2);
  } else if (keyCode == UP_ARROW) {
    console.log("rotate");
		game.animate(tetromino, 3);
  } else if (keyCode == DOWN_ARROW) {
    console.log("speed up");
		game.animate(tetromino, 4);
  }
  return 0;
}
