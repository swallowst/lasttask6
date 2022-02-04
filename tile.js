class TileManager {
  constructor(img) {
    this.img = img;
    this.grayImg = this.img.get();
    this.grayImg.filter(GRAY);
    this.row = 4;
    this.col = 4;
    this.tileSize = width/this.row;
    this.tiles = [];
    this.tileTable = [];
    this.createTiles();
    this.judgeCanMoveTiles();
    this.isClear = false;
  }

  displayHint() {
    for(let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].showHint = !this.tiles[i].showHint;
    }
  }

  judgeCanMoveTiles() {
    for(let k = 0;k < this.tiles.length; k++) { 
      const tile = this.tiles[k];
      tile.canMove = tile.i == this.emptyTile.i && abs(tile.j - this.emptyTile.j) == 1 ||
      tile.j == this.emptyTile.j && abs(tile.i - this.emptyTile.i) == 1;;
    }
  }

  swapTilePosition(tile1,tile2) {
    let tempX = tile1.x;
    let tempY = tile1.y;
    let tempi = tile1.i;
    let tempj = tile1.j;
    tile1.x = tile2.x;
    tile1.y = tile2.y;
    tile1.i = tile2.i;
    tile1.j = tile2.j;
    tile2.x = tempX;
    tile2.y = tempY;
    tile2.i = tempi;
    tile2.j = tempj;
  }

  getCanMoveTiles() {
    let tiles = [];
    for(let i = 0; i < this.tiles.length; i++) {
      if(this.tiles[i].canMove) {
        tiles.push(this.tiles[i]);
      }
    }
    return tiles;
  }

  mixTiles() {
    for(let i = 0; i < 1000; i++) {
      const canMoveTiles = this.getCanMoveTiles();
      const tile = choice(canMoveTiles);
      tile.swapTilePosition();
      tile.swapTileTable();
    }
  }

  swapTileTable(tile1,tile2) {
    let temp = this.tileTable[tile1.id];
    this.tileTable[tile1.id] = this.tileTable[tile2.id];
    this.tileTable[tile2.id] = temp;
    this.judgeCanMoveTiles();
  }

  judgeClear() {
    let id = 0;
    for(let i = 0 ; i < this.tileTable.length; i++) {
      if(this.tileTable[id] != id++) {
        return false;
      }
    }
    return true;
  }

  display() {
    if(this.isClear) {
      image(this.img,width/2,height/2,width,height);
      return;
    }
    for(let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].display();
    }
  }
  update() {
    if(this.isClear) {
      return;
    }
    for(let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].update();
    }
  }

  createTiles() {
    let id = 0;
    for(let i = 0; i < this.row; i++) {
      for(let j = 0; j < this.col; j++) {
        let tile = new Tile(this,i,j,id);
        this.tileTable.push(id);
        this.tiles.push(tile);
        id++;
      }
    }
    this.emptyTile = this.tiles[this.row * this.col - 1];
    this.judgeCanMoveTiles();
  }

}

class Tile {
  constructor(tileManager,i,j,id) {
    this.tileManager = tileManager;
    this.size = tileManager.tileSize;
    this.i = i;
    this.j = j;
    this.id = id;
    this.emptyId = tileManager.col * tileManager.row - 1;
    this.x = j * this.size + this.size/2;
    this.y = i * this.size + this.size/2;
    this.col = tileManager.col;
    this.img = tileManager.img.get(this.j * tileManager.img.width/this.col,this.i * tileManager.img.height/this.col,
                                    tileManager.img.width/this.col,tileManager.img.height/this.col);
    this.grayImg = tileManager.grayImg.get(this.j * tileManager.img.width/this.col,this.i * tileManager.img.height/this.col,
      tileManager.img.width/this.col,tileManager.img.height/this.col);
    this.eX = 0;                                 
    this.showHint = false;
  }

  display() {
    if(this.id == this.emptyId) {
      return;
    }
    if(this.id != this.emptyId) {
      if(this.id == this.tileManager.tileTable[this.id]) {
        image(this.img,this.x,this.y,this.size - 2,this.size - 2);
      } else {
        image(this.grayImg,this.x,this.y,this.size - 2,this.size - 2);
      }
    } 
    if(this.showHint) {
      this.displayHint();
    }
  }

  decideMoveDirection() {
    if(this.j > tileManager.emptyTile.j) {
      this.toX = this.fromX + -1 * this.size;
    } else if(this.j < this.tileManager.emptyTile.j) {
      this.toX = this.fromX + 1 * this.size;
    } else {
      this.toX = this.fromX;
    }

    if(this.i > tileManager.emptyTile.i) {
      this.toY = this.fromY + -1 * this.size;
    } else if(this.i < this.tileManager.emptyTile.i) {
      this.toY = this.fromY + 1 * this.size;
    } else {
      this.toY = this.fromY;
    }

  }

  update() {
    if(isHover(this.x,this.y,this.size,this.size) && mouseIsPressed && this.canMove) {
      for(let i = 0; i < this.tileManager.tiles.length; i++) {
        if(this.tileManager.tiles[i].isMove) {
          return;
        }
      }
      if(!this.isMove) {
        this.fromX = this.x;
        this.fromY = this.y;
        this.decideMoveDirection();
        this.isMove = true;
        this.tileManager.emptyTile.x = this.fromX;
        this.tileManager.emptyTile.y = this.fromY;
      }
    }
    if(this.isMove) {
      this.canMove = false;
      this.x = this.ease(this.eX,this.fromX,this.toX);
      this.y = this.ease(this.eX,this.fromY,this.toY);
      this.eX += 1/10;
      if (this.eX >= 1) {
        this.swapTilePosition();
        this.swapTileTable();
        this.isMove = false;
        this.eX = 0;
        this.x = this.toX;
        this.y = this.toY;
        this.tileManager.isClear = this.tileManager.judgeClear();
      }
    }
  }

  displayHint() {
    textSize(this.size/4);
    fill(50,255,50);
    text(`${this.id + 1}`,this.x,this.y);
  }

  ease(e,from,to) {
    return map(1 - pow(1 - e, 4),0,1,from,to);
  }

  swapTilePosition() {
    tileManager.swapTilePosition(this,tileManager.tiles[this.emptyId]);
  }
  swapTileTable() {
    tileManager.swapTileTable(this,tileManager.tiles[this.emptyId]);
  }

}