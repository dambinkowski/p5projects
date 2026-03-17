var font;
function preload() {
  font = loadFont('assets/Calistoga-Regular.ttf');
}

var points;
var mousePosition = 0;

function setup() {
  var cnv = createCanvas(900, 400);
  cnv.parent('canvas-holder');
  fill(255, 104, 204, 150);
  noStroke();

  points = font.textToPoints('c o d e', 50, 300, 300, {
    sampleFactor: .3,
    simplifyThreshold: 0
  });

}

function draw() {
  background(0);

  for (let i = 0; i < points.length; i++) {
    ellipse(points[i].x + random(-mousePosition, mousePosition), points[i].y + random(-mousePosition, mousePosition), 10);
  }

  noLoop();
}

function mouseMoved() {
  mousePosition = map(mouseX, 0, width, 0 , 80);
  loop();
}
