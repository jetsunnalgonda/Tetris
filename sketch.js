// var tetromino;
var game;

function setup() {
	// Create a new game
	game = new TetrisGame();

	console.log("New game created");
	console.log("game.gridSizeX = " + game.gridSizeX);
	console.log("game.gridSizeY = " + game.gridSizeY);

	// tetromino = new Tetromino();
	// tetromino.pos.x = floor(game.gridSizeX / 2);
	// tetromino.pos.y = 0;
	// tetromino.render();

}

function draw() {

		if (!game.gameOver) {
			game.drawPlayingField();
			game.update();
			drawControlWindow();
			// if (tetromino.landed) {
			// 	tetromino = new Tetromino();
			// 	tetromino.pos.x = floor(game.gridSizeX / 2);
			// 	tetromino.pos.y = 0;
			// }
			// game.animate();
			checkKeyDown();
		} else {
			game.end();
		}

		// if (tetromino.landed && !game.gameOver) {
		//
		// 	tetromino = new Tetromino();
		// 	tetromino.pos.x = floor(game.gridSizeX / 2);
		// 	tetromino.pos.y = 0;
		// 	// tetromino.render();
		// 	game.animate(tetromino);
		// 	if (game.gameOver) {
		// 		game.end();
		// 	}
		// }

}

function drawControlWindow() {
	var posX = game.tetrominoWindowX - 40;
	push();
	textSize(18);
	fill(109, 191, 79);
	text("Score: " + game.score, posX, 10);
	pop();
}

function checkKeyDown() {
	if (keyIsDown(LEFT_ARROW)) {
		if ((millis() - game.keyHoldTime) > 300) {
			game.animate(1, 5);
			// console.log("key is down")
		}
	} else if (keyIsDown(RIGHT_ARROW)) {
		if ((millis() - game.keyHoldTime) > 300) {
			game.animate(2, 5);
		}
	} else if (keyIsDown(DOWN_ARROW)) {
		game.animate(4, 5);
		// console.log("key is down");
	}
}

function keyPressed() {
	if (game.gameOver) { return; }
  if (keyCode == LEFT_ARROW) {
		game.keyHoldTime = millis();
    game.animate(1);
  } else if (keyCode == RIGHT_ARROW) {
		game.keyHoldTime = millis();
    game.animate(2);
  } else if (keyCode == UP_ARROW) {
    console.log("rotate");
		game.animate(3);
  } else if (keyCode == DOWN_ARROW) {
    console.log("speed up");
		game.animate(4);
  } else if (keyCode == 32) {
		game.pause();
  }
  return 0;
}

function keyReleased() {
  if (keyCode == LEFT_ARROW) {
		game.keyHoldTime = millis();
  } else if (keyCode == RIGHT_ARROW) {
		game.keyHoldTime = millis();
  }
  return 0;
}
