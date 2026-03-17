class Grid {
  /////////////////////////////////
  constructor(_w, _h) {
    this.gridWidth = _w;
    this.gridHeight = _h;
    this.noteSize = 80;
    this.notePos = [];
    this.noteState = [];
    this.noteAmount = 0; // calculate how many notes is there for this modyfikation of width/height and note size 
    this.noteActiveAmount = 0; // how many notes are actives 
    this.noteIsPlaying = []; // if note is active then means sound is playing 
    // using instead of  sound[].isPlaying() because piano key take couple seconds to fadeout and I don't want to interupt that fadeout
    // by calling sound[].stop() so that requires other value 
    
    // initalise grid structure and state
    for (var x = 0; x < _w; x += this.noteSize) {
      var posColumn = [];
      var stateColumn = [];
      for (var y = 0; y < _h; y += this.noteSize) {
        posColumn.push(createVector(x + this.noteSize / 2, y + this.noteSize / 2));
        stateColumn.push(0);
        this.noteAmount++; // calculated amount of notes 
        this.noteIsPlaying.push(0); // initilise playing status 
      }
      this.notePos.push(posColumn);
      this.noteState.push(stateColumn);
    }
  }
  /////////////////////////////////
  run(img) {
    img.loadPixels();
    this.findActiveNotes(img);
    this.drawActiveNotes(img);
  }
  /////////////////////////////////
  drawActiveNotes(img) {
    // for farther development Customize the graphics. 
    //In Grid.js you could customize the base grid of graphics thinking about color, opacity or shape
    // I decided to play with color change based on the amount of active notes
    // added some global variable and optymization of using the value of active notes 
    // from last iteration, but instead of loop over I created local currentActive 
    let currentActive = 0; // calculates active notes in this loop,  
    // then  value is given to global this.noteActiveAmount that store active nodes from last loop
  

    // draw active notes
    fill(255);
    noStroke();
    let index = 0; 
    for (var i = 0; i < this.notePos.length; i++) { // rows
      for (var j = 0; j < this.notePos[i].length; j++) { // columns
        var x = this.notePos[i][j].x;
        var y = this.notePos[i][j].y;
        if (this.noteState[i][j] > 0) { // if note is is active
          var alpha = this.noteState[i][j] * 180;
          var c1 = color(38, 220, 12, alpha);
          var c2 = color(255, 23, 10, alpha);
          var mix = lerpColor(c1, c2, map(this.noteActiveAmount, 0, this.noteAmount, 0, 1)); // more active notes more red they get 
          fill(mix);
          var s = this.noteState[i][j];
          ellipse(x, y, this.noteSize * s * 2 / 3, this.noteSize * s * 2 / 3);
          currentActive++;
          if (!this.noteIsPlaying[index]) { // check if active note is already playing sound, 
            // meaning if note just got activated play sound, but if note was active last frame dont play sound 
            let indexSounds = index % numOfSounds;
            sounds[indexSounds].play();
            this.noteIsPlaying[index] = 1;
          }
        } else {
          this.noteIsPlaying[index] = 0; // if note is not active it should not be playing sound 
        }
        this.noteState[i][j] -= 0.25;
        this.noteState[i][j] = constrain(this.noteState[i][j], 0, 1);
        index++;
      }
    }
    this.noteActiveAmount = currentActive; // save how many active notes are there to draw colors correctly in next frame 
  }

  /////////////////////////////////
  findActiveNotes(img) {
    for (var x = 0; x < img.width; x += 1) {
      for (var y = 0; y < img.height; y += 1) {
        var index = (x + (y * img.width)) * 4;
        var state = img.pixels[index + 0];
        if (state == 0) { // if pixel is black (ie there is movement)
          // find which note to activate
          var screenX = map(x, 0, img.width, 0, this.gridWidth);
          var screenY = map(y, 0, img.height, 0, this.gridHeight);
          var i = int(screenX / this.noteSize);
          var j = int(screenY / this.noteSize);
          this.noteState[i][j] = 1;
        }
      }
    }
  }
}
