////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}
////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  propeller = Bodies.rectangle(150,480,200,15, {isStatic: true, angle: angle});
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle += angleSpeed;
    fill(180);
    drawVertices(propeller.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
    for(let i = 0; i < birds.length; i++){
      // check if brid is on the screen before drawing
      if(isOffScreen(birds[i])) {
        removeFromWorld(birds[i]);
        birds.splice(i,1);
        i--;
      } 
      else {
        drawVertices(birds[i].vertices);
      }
    }    
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  var box;
  // 6 rows, 3 column, 80x80 pixels size
  for(let i = 0; i < 6; i++){
    for(let j = 0; j < 3; j++){
      box = Bodies.rectangle(
        680 + j * 80, // 680 starting point that every column 80 pixels
        140 + i * 80, // 140 starting point then 80 pixels every row
        80, 80)  // box size 
      boxes.push(box);
      colors.push(random(80,200)); // shade of green 
    }
  }
  World.add(engine.world, boxes);
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
    for(let i = 0; i < boxes.length; i++){
      fill(0, colors[i], 0);
      drawVertices(boxes[i].vertices);
    }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  slingshotBird = Bodies.circle(
    200,150, // x and y 
    20, // size 
    {friction: 0, restitution: 0.95});
  Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
  
  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 150 },
    bodyB: slingshotBird,
    pointB: { x: 0, y: 0},
    stiffness: 0.01,
    damping: 0.0001
  });

  World.add(engine.world, [slingshotBird, slingshotConstraint]);
  
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
    drawVertices(slingshotBird.vertices);
  pop();
  push()
    stroke(30,0,220);
    strokeWeight(5);
    drawConstraint(slingshotConstraint);
  pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
///////////////////////////////////////////////////////////////
function setupProtector(){
  protector.speedY = 2; // its only going to move up and down on y axis 

  protector.engineObject = Bodies.rectangle(600, 200, 10, 180, {isStatic: true});

  World.add(engine.world, [protector.engineObject]);

  protector.run = () => {
    protector.checkPosition();
    protector.move();
    protector.draw();
  }
  // checks the position of protector and decides the direction of movement 
  protector.checkPosition = () => {
    if(protector.engineObject.position.y == 120){ // if protector is at the top start moving down
      protector.speedY = 2; 
    }
    else if (protector.engineObject.position.y == 410){
      protector.speedY = -2; // if protector is at the bottom start moving up
    }
  } 
  // change protector position by the speedY ammount 
  protector.move = () => {
    Body.setPosition(
      protector.engineObject, 
      {x: protector.engineObject.position.x, y: (protector.engineObject.position.y + protector.speedY)}
      );
  }
  // draw the protector 
  protector.draw = () => {
    push();
      fill(120);
      drawVertices(protector.engineObject.vertices);
    pop();
  }
}
