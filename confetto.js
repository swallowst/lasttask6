class Confetto {
  constructor() {
    this.init();
    this.y = random(-height,0);
    this.r = 4;
    this.g = 0.1;
    this.k = 0.07;
    this.angZ = random(2 * PI);
    this.angX = random(2 * PI);
    colorMode(HSB);
    this.col = color(random(0,360),255,255);
    colorMode(RGB);
  }
  init() {
    this.x = random(0,width);
    this.vx = random(-2,2);
    this.vy = random(1,3);
    this.angAx = random(-0.0009,0.0009);
    this.angAz = random(-0.0009,0.0009);
    this.angVx = random(-0.1,0.1)* 1.5;
    this.angVy = random(-0.1,0.1)* 1.5;
    this.angVz = random(-0.1,0.1) * 1.5;
  }
  update() {
    if(this.y >= height + 50) {
      this.y = -100;
      this.init();
    }
    this.angX += this.angVx;
    this.angY = PI + this.angX;
    this.angZ += this.angVz;
    this.angVx += this.angAx;
    this.angVz += this.angAz;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.g;
    this.vx += -this.k * 0.01 * this.vx;
    this.vy += -this.k * this.vy;
  }

  display() {
    fill(this.col);
    stroke(this.col,0);
    
    beginShape();
    vertex(this.x + this.r * cos(PI/6 + this.angZ)       + this.r * cos(this.angX)  ,this.y + this.r * sin(PI/6+this.angZ)           + this.r * sin(this.angY));
    vertex(this.x + this.r * cos(PI - PI/6+this.angZ)    - this.r * cos(this.angX)  ,this.y + this.r * sin(PI - PI/6+this.angZ)      + this.r * sin(this.angY));
    vertex(this.x + this.r * cos(PI + PI/6+this.angZ)    - this.r * cos(this.angX)  ,this.y + this.r * sin(PI + PI/6+this.angZ)      - this.r * sin(this.angY));
    vertex(this.x + this.r * cos(2 * PI - PI/6+this.angZ)+ this.r * cos(this.angX)  ,this.y + this.r * sin(2 * PI - PI/6+this.angZ)  - this.r * sin(this.angY));
    vertex(this.x + this.r * cos(PI/6+this.angZ)         + this.r * cos(this.angX)  ,this.y + this.r * sin(PI/6+this.angZ)           + this.r * sin(this.angY));
    endShape();
  }
}