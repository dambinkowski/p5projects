// Code from a modified Daniel Shiffman example
// https://thecodingtrain.com/

var angle = 0;
var seed;


function setup() {
  var cnv = createCanvas(400, 400);
  cnv.parent('canvas-holder');
  seed = random(1000);
}
////////////////////////////////////////////////
function draw() {
  background(225);
  angleMode(DEGREES);
  randomSeed(seed);
  angle = random(100);
  stroke(255);
  translate(200, height);
  branch(100, 3,100);
}
/////////////////////////////////////////////////
function branch(len, thickness,color) {
  stroke(color,50,50);
  strokeWeight(thickness);
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle + (noise(frameCount/200) * 30));
    branch(len * random(0.5,0.8), thickness*0.8,color * 1.1);
    pop();
    push();
    rotate(-angle + (noise(frameCount/200) *30));
    branch(len * random(0.5,0.8), thickness*0.8, color * 1.1);
    pop();
  } else {
    noStroke();
    fill(200,80,80, random(50,200));
    ellipse(0,0,10);
  }
}
