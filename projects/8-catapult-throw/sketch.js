// Example is based on examples from:
// http://brm.io/matter-js/
// https://github.com/shiffman/p5-matter
// https://github.com/b-g/p5-matter-examples

// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;

var engine;
var ground;

var ball1;
var ball2;

var catapult;
var catapultSpacer;
var constraint;

function setup() {
  var cnv = createCanvas(800, 600);
  cnv.parent('canvas-holder');
  engine = Engine.create(); // create an engine
  setupCatapult();
  setupBalls();
  setupGround();
}
/////////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);
  drawBalls();
  drawCatapult();
  drawGround();
}
/////////////////////////////////////////////////////////////
function setupCatapult(){
  catapult = Bodies.rectangle(400, 510, 500, 20);
  catapultSpacer = Bodies.rectangle(190,550, 20,60, {isStatic: true});
  constraint = Constraint.create({
    pointA: {x: 400, y:510},
    bodyB: catapult,
    pointB: {x: 0, y: 0},
    stiffness: 1,
    length: 0
  });
  World.add(engine.world, [catapult, catapultSpacer, constraint]);
}
/////////////////////////////////////////////////////////////
function drawCatapult(){
  noStroke();
  fill(255);
  drawVertices(catapult.vertices);

  fill("red");
  drawVertices(catapultSpacer.vertices);
}
/////////////////////////////////////////////////////////////
function setupBalls(){
  ball1 = Bodies.circle(160,480,20, {density: 0.01});
  ball2 = Bodies.circle(600,10,50, {density: 0.01});

  World.add(engine.world, [ball1, ball2]);
}
/////////////////////////////////////////////////////////////
function drawBalls(){
  fill("blue");
  drawVertices(ball1.vertices);
  drawVertices(ball2.vertices);
}
/////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(400, 590, 800, 20, {isStatic: true});
  World.add(engine.world, [ground]);
}
/////////////////////////////////////////////////////////////
function drawGround(){
  noStroke();
  fill(128);
  drawVertices(ground.vertices);
}
////////////////////////////////////////////////////////////////
// ******* HELPER FUNCTIONS *********
// DO NOT WRITE BELOW HERE
/////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
