var speed;

function setup() {
    var cnv = createCanvas(900, 700);
    cnv.parent('canvas-holder');
}

function draw() {
    background(0); // black 
    speed = frameCount;

    push(); 
        // Start with the Sun - orgin right now is 0,0
        translate(width/2, height/2); // Move origin to draw Sun in the center
        push(); // Rotate(own axis) and draw Sun
            rotate(radians(speed/3)); // Rotate Sun
            celestialObj(color(255,150,0), 200); // Draw Sun
        pop();
        
        // Earth - origin is center of Sun now
        rotate(radians(speed));  // Rotate Earth around Sun
        translate(300, 0); // Move origin to draw Earth from Sun
        push(); // Rotate(own axis) and draw Earth
            rotate(radians(speed)); // Rotate Earth
            celestialObj(color('blue'), 80); // Draw Earth
        pop();

        // Moon - origin is center of Earth now 
        rotate(radians(-speed*2)); // Rotate Moon around Earth
        translate(100,0); // Move origin to draw Moon 100 pixels from Earth
        celestialObj(color('white'), 30); // Draw Moon 

        // Asteroid - origin is center of Moon now
        rotate(radians(-speed*3)); // Rotate Asteroid around Moon
        translate(28,0); // Move origin from center of the moon to orbit
        celestialObj(color('yellow'),12); // Draw Asteroid
    pop();
}

function celestialObj(c, size){
    strokeWeight(5);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}
