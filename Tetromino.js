class Tetromino {
  constructor(type) {
    this.type = type || 0;
    this.tetrominoes = this.getTetrominoes();
    this.shape = this.tetrominoes[type];

    this._blockSize = 10;
    this.rotation = 0;
    this._pos = createVector(0, 0);
  }
  getTetrominoes() {
    var tet = [];
    tet.push( [[0, 0, 0, 0],
    					 [0, 0, 0, 0],
    					 [1, 1, 1, 1],
    					 [0, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
  						 [0, 0, 0, 0],
  						 [0, 1, 1, 1],
  						 [0, 0, 0, 1]]);
    tet.push( [[0, 0, 0, 0],
   						 [0, 0, 0, 0],
   						 [1, 1, 1, 0],
   						 [1, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
  						 [0, 1, 1, 0],
  						 [0, 1, 1, 0],
  						 [0, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
   						 [0, 1, 1, 0],
   						 [1, 1, 0, 0],
   						 [0, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
               [0, 1, 1, 0],
               [0, 0, 1, 1],
               [0, 0, 0, 0]]);
    tet.push( [[0, 0, 0, 0],
               [0, 1, 0, 0],
               [1, 1, 1, 0],
               [0, 0, 0, 0]]);
    return tet;
  }

  get blockSize() {
    return this._blockSize;
  }

  set blockSize(newBlockSize) {
    this._blockSize = newBlockSize;
  }

  get pos() {
    return this._pos;
  }

  set pos(newValue) {
    this._pos = newValue;
  }

  rotate() {
    this.rotation = (this.rotation  + 1) % 4;
    var rotatedShape = [];
    for (var row of this.shape) {
      rotatedShape.push([...row]);
    }
    for (var row in this.shape) {
      for (var col in this.shape) {
        rotatedShape[col][row] = this.shape[row][col];
      }
    }

    for (var row in this.shape) {
      this.shape[row] = [...rotatedShape[row]];
    }


  }

  render() {
    push();
    translate(this.pos.x * this.blockSize, this.pos.y * this.blockSize);
    for (var row = 0; row < this.shape.length; row++) {
      for (var col = 0; col < this.shape[0].length; col++) {
        var fillData = this.shape[row][col];
        if (fillData == 1) {
          rect(this.blockSize * col,
               this.blockSize * row,
               this.blockSize,
               this.blockSize);
        }
      }
    }
    pop();
  }

}
