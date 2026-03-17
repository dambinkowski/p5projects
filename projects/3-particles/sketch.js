var balls = [];

function setup() {
  var cnv = createCanvas(900,600);
  cnv.parent('canvas-holder');
}

function draw() {
  background(0);
  var gravity = createVector(0, 0.1);

  for(let i = 0; i < balls.length; i++)
  {
    var friction = balls[i].velocity.copy();
    friction.mult(-1);
    friction.normalize();
    friction.mult(0.05);
    balls[i].applyForce(friction);
    balls[i].applyForce(gravity);
    balls[i].run();
  }
}

function mouseDragged(){
  balls.push(new Ball(mouseX, mouseY));
}

class Ball {
  constructor(x,y){
    this.velocity = new createVector(random(-3,3), random(-3,3));
    this.location = new createVector(x, y);
    this.acceleration = new createVector(0, 0);
    this.size = random(10,25);
    this.age = 255;
  }

  run(){
    this.draw();
    this.move();
    this.bounce();
  }

  draw(){
    noStroke();
    fill(173, 216, 230,100);
    if(this.age > 0) {
      ellipse(this.location.x, this.location.y, this.size, this.size);
      this.age -= 1;
    } 
    
  }

  move(){
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  bounce(){
    if (this.location.x > width-this.size/2) {
          this.location.x = width-this.size/2;
          this.velocity.x *= -1;
    } else if (this.location.x < this.size/2) {
          this.velocity.x *= -1;
          this.location.x = this.size/2;
    }
    if (this.location.y > height-this.size/2) {
          this.velocity.y *= -1;
          this.location.y = height-this.size/2;
    }
  }
  
  applyForce(force){
    this.acceleration.add(force);
  }

}
