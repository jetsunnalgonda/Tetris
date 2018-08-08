class TetrisGame {
  constructor(fieldX, fieldY, blockSize) {
    this.border = 10;
    this._gridSizeX = fieldX || 30;
    this._gridSizeY = fieldY || 40;
    this._blockSize = blockSize || 10;
    this.grid;
    this.tetrominoWindowX;
    this.tetrominoWindowY;
    this.controlWindowX = 100;
    this.setupGrid();
    this.spawnTetromino();
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
    for (var i = 0; i < this.gridSizeX; i++) {
      var row = [];
      for (var j = 0; j < this.gridSizeY; j++) {
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

  }

  spawnTetromino() {
    // var numberOfTetrominoes = tetro
    return new Tetromino(round(random(6)));
    // Create tetromino objects
  	for (var i = 0; i <= 6; i++) {
  		tetromino.push(new Tetromino(i));
  	}
  }
}
