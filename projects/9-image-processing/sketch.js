// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
let imgIn;
let canvasRef;
let filtersStatus = {
  sepiaFilterIsActive: true, 
  darkCornersIsActive: true, 
  radialBlurFilterIsActive: true,
  borderFilterIsActive: true
}

let matrix = [
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64]
];
/////////////////////////////////////////////////////////////////
function preload() {
  imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
  var cnv = createCanvas((imgIn.width * 2), imgIn.height);
  cnv.parent('canvas-holder');

  canvasRef = cnv;
  applyCanvasScale();

  pixelDensity(1);
  noLoop();
}

function windowResized() {
  applyCanvasScale();
}

function applyCanvasScale() {
  if (!canvasRef) return;

  var maxScale = 0.7;
  var holder = document.getElementById('canvas-holder');
  var wrap = document.getElementById('canvas-wrap');
  var instructions = document.querySelector('.instructions');

  var availableWidth = Math.max(200, window.innerWidth - 24);
  var availableHeight = window.innerHeight - (instructions ? instructions.offsetHeight : 0) - 24;

  var scale = Math.min(maxScale, availableWidth / width, availableHeight / height);
  if (!isFinite(scale) || scale <= 0) {
    scale = maxScale;
  }

  canvasRef.style('transform', 'scale(' + scale + ')');
  canvasRef.style('transform-origin', 'top left');

  if (holder) {
    holder.style.width = width + 'px';
    holder.style.height = height + 'px';
    holder.style.display = 'block';
  }

  if (wrap) {
    wrap.style.width = (width * scale) + 'px';
    wrap.style.height = (height * scale) + 'px';
  }
}
/////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  image(imgIn, 0, 0);
  image(earlyBirdFilter(imgIn), imgIn.width, 0);
  drawTextFilterStatus(); // draw text on the img to indicate what filters are used 
  // text to indicate filter status, changes when number keys are pressed
  
}
/////////////////////////////////////////////////////////////////
function mousePressed() {
  draw();
}

/** draw text of filter status on the canvas */
function drawTextFilterStatus() {
  push(); // after function running go back to default text settings 
  textSize(15);
  
  let x = 10; // loc x of text 
  let y = 14; // loc y of text 
  let spcaing = 16 // spacing between rows of text

  text("Filters: to change press keys from 1-4", x - 3, y);
  // write the message based on filter status 
  if (filtersStatus.sepiaFilterIsActive) 
    text("1.Sepia : On", x, y+=spcaing);
  else
    text("1.Sepia : Off", x, y+=spcaing);

  if (filtersStatus.darkCornersIsActive) 
    text("2.Dark corners : On", x, y += spcaing);
  else
    text("2.Dark corners : Off", x, y += spcaing);

  if (filtersStatus.radialBlurFilterIsActive) 
    text("3.Radial blur : On", x, y += spcaing);
  else
    text("3.Radial blur : Off", x, y += spcaing);
  
  if (filtersStatus.borderFilterIsActive)
    text("4.Border : On", x, y += spcaing);
  else
    text("4.Border : Off", x, y += spcaing);

  pop();
}

/** Activates or disactivates filter based on user choice of key pressed then redraws the canvas */
function keyPressed() {
  switch (keyCode) {
    case 49: // pressed 1
      filtersStatus.sepiaFilterIsActive = !filtersStatus.sepiaFilterIsActive;
      break;
    case 50: // pressed 2 
      filtersStatus.darkCornersIsActive = !filtersStatus.darkCornersIsActive;
      break;
    case 51: // pressed 3 
      filtersStatus.radialBlurFilterIsActive = !filtersStatus.radialBlurFilterIsActive;
      break;
    case 52: // pressed 4 
      filtersStatus.borderFilterIsActive = !filtersStatus.borderFilterIsActive;
      break;
    default:
      return; // if other key were pressed nothing changes no reason to redraw the canvas 
  }
  draw(); // redraw the canvas with different filter customization 
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img) {
  let resultImg = createImage(img.width, img.height);
  resultImg = img; // copy the original photo to resultImg

  // check what filters are active, and input resultImg over filters that are active
  if (filtersStatus.sepiaFilterIsActive) {
    resultImg = sepiaFilter(resultImg);
  }

  if (filtersStatus.darkCornersIsActive) {
    resultImg = darkCorners(resultImg);
  }

  if (filtersStatus.radialBlurFilterIsActive) {
    resultImg = radialBlurFilter(resultImg, matrix.length);
  }

  if (filtersStatus.borderFilterIsActive) {
    resultImg = borderFilter(resultImg)
  }

  return resultImg;
}

/** takes image and returs same size img with alternated pixel color values - sepia */
function sepiaFilter(img) {
  // create returnImg same size as input img, analyze img pixel alter color values into returnImg then return it

  let returnImg = createImage(img.width, img.height);
  returnImg.loadPixels();
  img.loadPixels();

  /*
  Iterating over 2D pixel grid and parse it into 1D array
  - each pixel needs 4 elements in 1D array R, G, B, Alpha. 
  - iterating over 2D array by reading pixels from left to right than moving to next row 
  */
  // loop over each row on y axis
  for (let y = 0; y < returnImg.height; y++) {
    // index of 1D array at this point is index = (y * returnImg.width * 4)
    // because each row y is is of returnImg.width x column and each column takes 4 spaces 

    // loop over each pixel in column on x axis
    for (let x = 0; x < returnImg.width; x++) {
      // index of 1D array at this point is all the pixels data from previous rows (y * returnImg.width * 4)
      // plus column x value multiplayed by 4 because each stores 4 values in 1D array wich are R,G,B,Alpha 
      // index = previous rows + current x times 4 (times 4 because each x has 4 values RGBA)
      let index = (y * returnImg.width * 4) + (x * 4); // index value of 1D pixel color values data array 

      // get img pixel color values from img.pixels 1D array 
      let imgR = img.pixels[index + 0]; // img pixel: row y, column x, value of R
      let imgG = img.pixels[index + 1]; // img pixel: row y, column x, value of G
      let imgB = img.pixels[index + 2]; // img pixel: row y, column x, value of B

      // update returnImg pixel color values by applying sepia filter color on img pixel color values
      returnImg.pixels[index + 0] = imgR * .393 + imgG * .769 + imgB * .189; // returnImg pixel: row y, column x, value of R
      returnImg.pixels[index + 1] = imgR * .349 + imgG * .686 + imgB * .168; // returnImg pixel: row y, column x, value of G
      returnImg.pixels[index + 2] = imgR * .272 + imgG * .534 + imgB * .131; // returnImg pixel: row y, column x, value of B
      returnImg.pixels[index + 3] = 255; // returnImg pixel: row y, column x, value of A
    }
  }
  returnImg.updatePixels();
  return returnImg;
}

/** takes image and returs same size img with alternated pixels color values - dark corners*/
function darkCorners(img) {
  // create returnImg, find middle pixel in input img, alter pixel color values depending
  // on distance from center and store them in returnImg ther function returns returnImg

  let returnImg = createImage(img.width, img.height);
  returnImg.loadPixels();
  img.loadPixels();

  // calculating center pixel coordinates 
  let centerPixel = {
    x: floor(returnImg.width / 2), // floor to make sure that value is integer number after deviding 
    y: floor(returnImg.height / 2) // floor to make sure that value integer number after deviding 
  }

  // calculate max distance for pixels from pixel img to center, fartest pixels are the corner pixel
  // calculate left corner pixel to the center to get max distance 
  let maxDistance = dist(0, 0, centerPixel.x, centerPixel.y);

  /*
  Iterating over 2D pixel grid and parse it into 1D array
  - each pixel needs 4 elements in 1D array R, G, B, Alpha. 
  - iterating over 2D array by reading pixels from left to right than moving to next row 
  */
  // loop over each row on y axis
  for (let y = 0; y < returnImg.height; y++) {
    // index of 1D array at this point is index = (y * returnImg.width * 4)
    // because each row y is is of returnImg.width x column and each column takes 4 spaces 

    // loop over each pixel in column on x axis
    for (let x = 0; x < returnImg.width; x++) {
      // index of 1D array at this point is all the pixels data from previous rows (y * returnImg.width * 4)
      // plus column x value multiplayed by 4 because each stores 4 values in 1D array wich are R,G,B,Alpha 
      // index = previous rows + current x times 4 (times 4 because each x has 4 values RGBA)
      let index = (y * returnImg.width * 4) + (x * 4); // index value of 1D pixel color values data array 

      //calculate distance between current pixel and center of image 
      let pixDistanceFromCenter = dist(x, y, centerPixel.x, centerPixel.y);

      // calculate pixel values based on conditions for dark corners filter 
      if (pixDistanceFromCenter < 300) { // - up to 300 pixels away from the centre of the image – no adjustment
        returnImg.pixels[index + 0] = img.pixels[index + 0]; // returnImg pixel: row y, column x, value of R
        returnImg.pixels[index + 1] = img.pixels[index + 1]; // returnImg pixel: row y, column x, value of G
        returnImg.pixels[index + 2] = img.pixels[index + 2]; // returnImg pixel: row y, column x, value of B
        returnImg.pixels[index + 3] = 255; // returnImg pixel: row y, column x, value of A
      }
      else if (pixDistanceFromCenter <= 450) { // - from 300 to 450 scale by 1 to 0.4 depending on distance
        let dynLum = map(pixDistanceFromCenter, 300, 450, 1, 0.4); // scale of dynamic lumiance 
        returnImg.pixels[index + 0] = img.pixels[index + 0] * dynLum; // returnImg pixel: row y, column x, value of R
        returnImg.pixels[index + 1] = img.pixels[index + 1] * dynLum; // returnImg pixel: row y, column x, value of G
        returnImg.pixels[index + 2] = img.pixels[index + 2] * dynLum; // returnImg pixel: row y, column x, value of B
        returnImg.pixels[index + 3] = 255; // returnImg pixel: row y, column x, value of A
      }
      else { // - 450 and above scale by a value between 0.4 and 0
        let dynLum = map(pixDistanceFromCenter, 450, maxDistance, 0.4, 0); // scale of dynamic lumiance 
        returnImg.pixels[index + 0] = img.pixels[index + 0] * dynLum; // returnImg pixel: row y, column x, value of R
        returnImg.pixels[index + 1] = img.pixels[index + 1] * dynLum; // returnImg pixel: row y, column x, value of G
        returnImg.pixels[index + 2] = img.pixels[index + 2] * dynLum; // returnImg pixel: row y, column x, value of B
        returnImg.pixels[index + 3] = 255; // returnImg pixel: row y, column x, value of A
      }
    }
  }

  returnImg.updatePixels();
  return returnImg;
}

/** takes image and returs same size img with alternated pixel color values - radial blur */
function radialBlurFilter(img, matrixSize) {
  // create returnImg same size as input img, analyze img pixel alter color values into returnImg then return it

  let returnImg = createImage(img.width, img.height);
  returnImg.loadPixels();
  img.loadPixels();

  /*
  Iterating over 2D pixel grid and parse it into 1D array
  - each pixel needs 4 elements in 1D array R, G, B, Alpha. 
  - iterating over 2D array by reading pixels from left to right than moving to next row 
  */
  // loop over each row on y axis
  for (let y = 0; y < returnImg.height; y++) {
    // index of 1D array at this point is index = (y * returnImg.width * 4)
    // because each row y is is of returnImg.width x column and each column takes 4 spaces 

    // loop over each pixel in column on x axis
    for (let x = 0; x < returnImg.width; x++) {
      // index of 1D array at this point is all the pixels data from previous rows (y * returnImg.width * 4)
      // plus column x value multiplayed by 4 because each stores 4 values in 1D array wich are R,G,B,Alpha 
      // index = previous rows + current x times 4 (times 4 because each x has 4 values RGBA)
      let index = (y * returnImg.width * 4) + (x * 4); // index value of 1D pixel color values data array

      // get img pixel color values from img.pixels 1D array 
      let imgR = img.pixels[index + 0]; // img pixel: row y, column x, value of R
      let imgG = img.pixels[index + 1]; // img pixel: row y, column x, value of G
      let imgB = img.pixels[index + 2]; // img pixel: row y, column x, value of B

      // get convolution 
      let c = convolution(x, y, matrix, matrixSize, img);
      
      // get distance from mouse dynBlur
      let dynBlur = dist(x, y, mouseX, mouseY);
      dynBlur = constrain(dynBlur, 100, 300);
      dynBlur = map(dynBlur, 100, 300, 0, 1);

      // update returnImg pixel color values by applying sepia filter color on img pixel color values
      returnImg.pixels[index + 0] = c[0] * dynBlur + imgR * (1 - dynBlur); // returnImg pixel: row y, column x, value of R
      returnImg.pixels[index + 1] = c[1] * dynBlur + imgG * (1 - dynBlur); // returnImg pixel: row y, column x, value of R
      returnImg.pixels[index + 2] = c[2] * dynBlur + imgB * (1 - dynBlur); // returnImg pixel: row y, column x, value of R
      returnImg.pixels[index + 3] = 255; // returnImg pixel: row y, column x, value of A
    }
  }
  returnImg.updatePixels();
  return returnImg;
}

/** takes pixel coordinates and based on matrix of local pixels returns table of 3 colors [R,G,B] */
function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0.0;
  var totalGreen = 0.0;
  var totalBlue = 0.0;
  var offset = floor(matrixSize / 2);

  // convolution matrix loop
  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
      // Get pixel loc within convolution matrix
      var xloc = x + j - offset; // x is which column on x axis 
      var yloc = y + i - offset; // y is which row on y axis 
      var index = (xloc + img.width * yloc) * 4;
      // ensure we don't address a pixel that doesn't exist
      index = constrain(index, 0, img.pixels.length - 1);

      // multiply all values with the mask and sum up
      totalRed += img.pixels[index + 0] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }
  // return the new color
  return [totalRed, totalGreen, totalBlue];
}

/** takes image and returs same size img with alternated pixel by adding white border */
function borderFilter(img) {
  // create buffer load img to it and draw white rectangle border 
  let buffer = createGraphics(img.width, img.height); // create buffer

  // load img to buffer
  buffer.image(img, 0, 0); 

  // draw rectangles for white border 
  buffer.noFill();
  buffer.stroke(255);
  buffer.strokeWeight(20);
  buffer.rect(0, 0, buffer.width, buffer.height, 50);
  buffer.rect(0, 0, buffer.width, buffer.height);

  return buffer;
}