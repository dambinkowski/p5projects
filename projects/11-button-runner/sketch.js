class Tickler {
  constructor() {
    this.size = 50;
  }

  run(mouseX, mouseY) {
    this.move(mouseX, mouseY);
    this.draw();
  }

  setPosition(vector) {
    this.pos = vector;
  }

  move(mouseX, mouseY) {
    if (this.isMouseInside(mouseX, mouseY)) {
      fill(255,0,0);
      this.pos.x += random(-8, 8);
      this.pos.y += random(-8, 8);
    } else {
      fill(255);
    }
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  isMouseInside(mouseX, mouseY) {
    if (mouseX < this.pos.x + this.size / 2
      && mouseX > this.pos.x - this.size / 2
      && mouseY < this.pos.y + this.size / 2
      && mouseY > this.pos.y - this.size / 2)
      return true;
    return false;
  }
}

const tickler = new Tickler();

function setup() {
  var cnv = createCanvas(900, 600);
  cnv.parent('canvas-holder');
  background(0);
  tickler.setPosition(createVector(width / 2, height / 2));
}

function draw() {
  background(0);

  tickler.run(mouseX, mouseY);
}
