var SLIDE15 = {};

// Constants


SLIDE15.Game = function(img, w, h, url) {
  this.col = 4;
  this.img = img;
  this.url = url;
  this.size = w < h ? w : h;
  this.tile_size = this.size / this.col;
  console.log("instatiated this thing");
  console.log(this.img);
  console.log(this.size);
  console.log(this.tile_size);
};
