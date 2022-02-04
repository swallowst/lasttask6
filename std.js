function isHover(x,y,w,h) {
  return mouseX > x - w/2 && mouseX < x + w/2 &&
  mouseY > y - h/2 && mouseY < y + h/2;
}

function randint(min,max) {
  return parseInt(Math.random() * (max - min + 1) + min);
}

function choice(array) {
  let len = array.length;
  return array[randint(0,len - 1)];
}