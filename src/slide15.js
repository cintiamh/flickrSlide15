var SLIDE15 = {};

// Constants
SLIDE15.tile_size = 0;
SLIDE15.board = null;
SLIDE15.tiles = [];
SLIDE15.emptyTile = null;
SLIDE15.shuffleMoves = 10;
SLIDE15.image = "";
SLIDE15.cols = 4;

SLIDE15.Game = function(img, w, h, url) {
//    this.img = img;
    SLIDE15.image = img;
    this.size = w < h ? w : h;
    SLIDE15.tile_size = this.size / SLIDE15.cols;
    SLIDE15.board = new SLIDE15.Board(SLIDE15.cols);
    SLIDE15.board.shuffle();
};

SLIDE15.Board = function(cols) {
    var empty = false;
    this.cols = cols;

    // rows
    for (var i = 0; i < this.cols; i++) {
        SLIDE15.tiles[i] = [];
        // cols
        for (var j = 0; j < this.cols; j++) {
            empty = i === this.cols - 1 && j === this.cols - 1;
            SLIDE15.tiles[i][j] = new SLIDE15.Tile(i, j, empty);
            if (empty) {
                SLIDE15.emptyTile = SLIDE15.tiles[i][j];
            }
        }
    }
};

SLIDE15.Board.prototype.isComplete = function() {
    var i, j;

    for (i = 0; i < this.cols; i++) {
        for (j = 0; j < this.cols; j++) {
            if (SLIDE15.tiles[i][j].posRow !== i || SLIDE15.tiles[i][j].posCol !== j) {
                return false;
            }
        }
    }
    return true;
};

SLIDE15.Board.prototype.shuffle = function() {
    var randRow = 0, randCol = 0, moves;

    moves = SLIDE15.shuffleMoves;
    while(moves >= 0) {
        randRow = Math.floor(Math.random() * this.cols);
        randCol = Math.floor(Math.random() * this.cols);
        if (SLIDE15.tiles[randRow][randCol].canMove()) {
            SLIDE15.tiles[randRow][randCol].moveTile();
            moves--;
        }
    }
};

SLIDE15.Tile = function(row, col, empty) {
    var that = this;
    this.empty = empty;
    this.imageSet = false;
    this.dom = document.getElementById("tile" + row + col);
    this.dom.addEventListener("click", function() {
        that.moveTile();
        var complete = SLIDE15.board.isComplete();
        if (complete) {
            alert("You Win!!!");
        }
    });

    // Initialize tile
    this.setPosition(row, col);
};

SLIDE15.Tile.prototype.setPosition = function(row, col) {
    var colVal, rowVal;
    this.posCol = col;
    this.posRow = row;
    colVal = col * SLIDE15.tile_size;
    this.dom.style.left = colVal + "px";
    rowVal = row * SLIDE15.tile_size;
    this.dom.style.top = rowVal + "px";
    if (!this.imageSet) {
        this.imageSet = true;
        if (row !== col || row !== SLIDE15.cols - 1) {
            this.dom.style.backgroundImage = 'url('+SLIDE15.image+')';
            this.dom.style.backgroundPosition = '-' + colVal + 'px -' + rowVal + 'px';
        }
    }
};

SLIDE15.Tile.prototype.canMove = function() {
    var emptyCol = SLIDE15.emptyTile.posCol,
        emptyRow = SLIDE15.emptyTile.posRow;

    if (this.posCol === emptyCol && (this.posRow === emptyRow - 1 || this.posRow === emptyRow + 1)) {
        return true;
    }
    else if (this.posRow === emptyRow && (this.posCol === emptyCol - 1 || this.posCol === emptyCol + 1)) {
        return true;
    }
    return false;
};

SLIDE15.Tile.prototype.moveTile = function() {
    var move = this.canMove(),
        emptyCol = SLIDE15.emptyTile.posCol,
        emptyRow = SLIDE15.emptyTile.posRow;

    if (move) {
        SLIDE15.emptyTile.setPosition(this.posRow, this.posCol)
        this.setPosition(emptyRow, emptyCol);
    }
};

