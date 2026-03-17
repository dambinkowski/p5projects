var stepSize = 20;

function setup() {
  var cnv = createCanvas(500, 500);
  cnv.parent('canvas-holder');

  // for better visueal effect, lower octav from default 4 to 2
  // to get higher intensity of color difference at one canvas 
  // what contributes to different style
  noiseDetail(3);

}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
  noStroke();
  var size = 25; // rectangle size 
  var fromColor = color(255, 100, 100);
  var toColor = color(100, 255, 100);
  for (let i = 0; i < stepSize; i++) {
    for (let j = 0; j < stepSize; j++) {
      let n = noise(j / 20, i / 20, frameCount / mouseX);
      let c = lerpColor(fromColor, toColor, n);
      fill(c);
      rect(size * j, size * i, size, size);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
  strokeWeight(3);
  var stepLength = 25;
  var middleOfStepLength = stepLength / 2;
  var fromColor = color(0, 0, 100); // dark blue lines
  var toColor = color(250, 150, 0); // dark green lines 
  for (let i = 0; i < stepSize; i++) {
    for (let j = 0; j < stepSize; j++) {
      let n = noise(j / 20, i / 20, frameCount / mouseX);
      let angle = map(n, 0, 1, 0, 720); // angle
      let c = lerpColor(fromColor, toColor, n); // color
      let compasLineLength = map(n, 0, 1, -1, -70); // line length
      stroke(c);
      push();
        // middleOfStepLength - moves origin to the middle first grid box 
        // where stepLenngth is the distance between middles of grid boxes 
        translate(
          middleOfStepLength + i * stepLength,
          middleOfStepLength + j * stepLength);
        rotate(radians(angle));
        line(0, 0, 0, compasLineLength); // draw line default poinitng up 
      pop();
    }
  }
}
