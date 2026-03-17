// Maurer Rose
// inspired by Daniel Shiffman
// https://youtu.be/4uU9lZ-HSqA
// engineered from:
// https://en.wikipedia.org/wiki/Rose_(mathematics)
// https://en.wikipedia.org/wiki/Maurer_rose

var n = 2;
var d = 52;
var dSlider;

function setup() {
  var cnv = createCanvas(400, 400);
  cnv.parent('canvas-holder');
  angleMode(DEGREES);

  dSlider = createSlider(1,180,53);
  nSlider = createSlider(1,10,2);
}
/////////////////////////////////////////////////////////
function draw() {
  background(0);
  drawSliders();

  // get the values d and n to use for roses
  d = dSlider.value();
  n = nSlider.value();

  translate(width/2,height/2);

  //place the white lines of the Maurer rose
  stroke(255);
  noFill();
  beginShape();
  strokeWeight(1);
  for (let i = 0; i < 361; i++) {
    let k = i * d;
    let r = 150 * sin(n*k);
    let x = r * cos(k);
    let y = r * sin(k);
    vertex(x,y);
  }
  endShape();

  //build the Polar rose (in pink)
  noFill();
  stroke(255,0,255, 255);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < 361; i++) {
    let r = 150 * sin(n*i);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x,y);
  }
  endShape();
}
/////////////////////////////////////////////////////////
function drawSliders(){
  stroke(255);
  strokeWeight(1);
  dSlider.position(20, 5);
  text('d = '+ dSlider.value(), dSlider.x + dSlider.width +10, dSlider.y+17);
  nSlider.position(20, 30);
  text('n = '+ nSlider.value(), nSlider.x + nSlider.width +10, nSlider.y+17);
}
