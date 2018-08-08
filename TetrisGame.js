class TetrisGame {
  constructor(fieldX, fieldY, blockSize) {
    this.gameOver = false;
    this.border = 10;
    this._gridSizeX = fieldX || 20;
    this._gridSizeY = fieldY || 30;
    this._blockSize = blockSize || 15;
    this.grid;
    this.tetrominoWindowX;
    this.tetrominoWindowY;
    this.controlWindowX = 100;
    this.setupGrid();
    // this.drawPlayingField();
  }

  get blockSize() {
    return this._blockSize;
  }

  set blockSize(newBlockSize) {
    this._blockSize = newBlockSize;
  }

  get gridSizeX() {
    return this._gridSizeX;
  }

  set gridSizeX(newValue) {
    this._gridSizeX = newValue;
  }
  get gridSizeY() {
    return this._gridSizeY;
  }

  set gridSizeY(newValue) {
    this._gridSizeY = newValue;
  }

  setupGrid() {
    this.grid = [];
    for (var i = 0; i < this.gridSizeY; i++) {
      var row = [];
      for (var j = 0; j < this.gridSizeX; j++) {
        row.push(0);
      }
      this.grid.push(row);
    }
  }

  drawPlayingField() {
    var w = this.gridSizeX * this.blockSize;
    var h = this.gridSizeY * this.blockSize;
    var padding = 20;

    this.tetrominoWindowX = w + this.border * 2 + 1 + padding * 2;
    this.tetrominoWindowY = h + this.border * 2 + 1 + padding * 2;

    createCanvas(this.tetrominoWindowX + this.controlWindowX, this.tetrominoWindowY);
  	background(51);

  	translate(this.border / 2 + padding, this.border / 2 + padding);
  	push()
  	stroke(255);
  	strokeWeight(this.border);
  	noFill();
  	rect(0, 0, w + this.border + 1, h + this.border + 1);
  	pop();
  	translate(this.border / 2, this.border / 2);

    // Draw the landed blocks
    this.renderGrid();

  }

  animate(tetromino, opt) {
    if (tetromino.landed) { return; }
    if (opt === undefined) { opt = 0; }
    var posX = tetromino.pos.x;
    var posY = tetromino.pos.y;

    // Check if when first spawned it is already colliding
    if (this.checkCollision(tetromino)) {
      this.gameOver = true;
      return;
    }

    if (opt == 0) {
      tetromino.pos.y *= 10;
      tetromino.pos.y += 1;
      tetromino.pos.y /= 10;
      if (this.checkCollision(tetromino)) {
        tetromino.pos.y = posY;
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
    } else if (opt == 1) {
      tetromino.pos.x -= 1;
      if (this.checkCollision(tetromino, -1)) {
        tetromino.pos.x = posX;
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
    } else if (opt == 2) {
      tetromino.pos.x += 1;
      if (this.checkCollision(tetromino, 1)) {
        tetromino.pos.x = posX;
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
    } else if (opt == 3) {
      console.log("tetromino.pos.y = " + tetromino.pos.y);
      tetromino.rotate();
      if (this.checkCollision(tetromino, 1)) {
        tetromino.rotate(true);
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
      console.log("tetromino.pos.y = " + tetromino.pos.y);
    } else if (opt == 4) {
      tetromino.pos.y += 1;
      if (this.checkCollision(tetromino)) {
        tetromino.pos.y = posY;
        if (tetromino.landed) { this.addToGrid(tetromino); }
      }
    }
    var tmp = tetromino.pos.y;
    tetromino.pos.y = floor(tmp);
    tetromino.render();
    tetromino.pos.y = tmp;
  }

  checkCollision(tetromino, direction) {
    if (direction === undefined) { direction = 0; }
    // console.log("direction = " + direction);
    var rowMax = tetromino.shape.length - 1;
    var posX = tetromino.pos.x;
    var posY = tetromino.pos.y;
    for (var i = rowMax; i >= 0; i--) {
      var row = tetromino.shape[i];
      for (var j = 0; j < row.length; j++) {
        if (row[j] == 1) {
          var checkX = floor(posX + j);
          var checkY = floor(posY + i);
          // console.log("checkX, checkY = " + checkX, checkY);
          // console.log("this.grid[checkY][checkX] = " + this.grid[checkY][checkX]);
          if (checkY > this.grid.length - 1) {
            // Landed on the ground
            console.log("Landed on the ground");
            console.log("checkY = " + checkY);
            console.log("tetromino.pos.y = " + tetromino.pos.y);
            console.log("j = " + j);

            tetromino.landed = true;
            return true;
          } else if ((this.grid[checkY][checkX] == 1) && (abs(direction == 1))) {
            // console.log("direction = " + direction);
            // console.log("abs(direction) = " + abs(direction));
            // Sliding on a piece
            console.log("Sliding on a piece");
            // tetromino.landed = true;
            return true;
          } else if (this.grid[checkY][checkX] == 1) {
            // console.log("direction = " + direction);
            // Landed on a piece
            console.log("Landed on a piece");
            tetromino.landed = true;
            return true;
          } else if ((checkX > this.grid[0].length - 1) || (checkX < 0)) {
            // Colliding to the side walls
            console.log("Colliding to the side walls");
            return true;
          }
        }
      }
    }
    return false;
  }

  addToGrid(tetromino) {
    for (var row = 0; row < tetromino.shape.length; row++) {
      for (var col = 0; col < tetromino.shape[row].length; col++) {
        var posCol = floor(col + tetromino.pos.x);
        var posRow = floor(row + tetromino.pos.y);
        if (tetromino.shape[row][col] == 1) {
          this.grid[posRow][posCol] = 1;
        }
      }
    }

  }

  renderGrid() {
    for (var row = 0; row < this.grid.length; row++) {
      for (var col = 0; col < this.grid[0].length; col++) {
        var fillData = this.grid[row][col];
        if (fillData == 1) {
          rect(this.blockSize * col,
               this.blockSize * row,
               this.blockSize,
               this.blockSize);
        }
      }
    }

  }

}
