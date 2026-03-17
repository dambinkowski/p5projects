const balls = [];

function setup() {
  var cnv = createCanvas(900,600);
  cnv.parent('canvas-holder');
  background(0);
  for (let i = 0; i < 100; i++)
  {
    balls.push(new Ball);
  }

  
}

function draw() {
  for (let i = 0; i<balls.length; i++)
  {
    balls[i].run();
  }
}

class Ball {

  constructor(){
    var randomX = width/2+random(-100,100);
    var randomY = height/2+random(-100,100);
    this.prevLocation = new createVector(randomX, randomY);
    this.velocity = new createVector(0, 0);
    this.location = new createVector(randomX, randomY);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 4;
    this.color = color(random(0,255),random(0,255),random(0,255));
  }

  run(){
    this.draw();
    this.move();
  }

  draw(){
    stroke(this.color);
    strokeWeight(1);
    line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    this.prevLocation = this.location.copy();
  }

  move(){
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.2);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }
}
