let tileManager;
const canvas = document.getElementById("canvas");
let img;
let images = [];
let targetIndex;
let imageUrl;
let confetti = []
function preload() {
  images.push(loadImage("sample1.png"));
  images.push(loadImage("sample2.png"));
  images.push(loadImage("sample3.png"));
  images.push(loadImage("sample4.png"));
  for(let i = 0; i < 100; i++) {
    confetti.push(new Confetto());
  }
}

function setup() {
  let can = createCanvas(400,400);
  can.parent(canvas);
  targetIndex = randint(0,images.length - 1);
  tileManager = new TileManager(images[targetIndex]);
  tileManager.mixTiles();

  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  imageMode(CENTER);
}

function draw() {
  background(0);
  tileManager.display();
  tileManager.update();
  if(tileManager.isClear) {
    for(let i = 0; i < confetti.length; i++) {
      confetti[i].update();
      confetti[i].display();
    }
  }
}

let resetButton = document.querySelector("#resetButton");
let hintButton = document.querySelector("#hintButton");


resetButton.addEventListener("click",(event) => {
  event.preventDefault();
  tileManager = new TileManager(images[targetIndex++ % images.length]);
  tileManager.mixTiles();
  for(let i = 0; i < confetti.length; i++) {
    confetti[i].init();
    confetti[i].y = random(-400,0);
  }
});

hintButton.addEventListener("click",(event) => {
  event.preventDefault();
  tileManager.displayHint();
});
