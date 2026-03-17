var imgs = [];
var avgImg;
var avgImgMouseXRelevent;  // avg image transition between the randomly selected image and the average image based on the mouseX value
var numOfImages = 30;
var photoLeftDisplayId;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    // fill imgs array with images from assets 
    for (let i = 0; i < numOfImages; i++) {
        let filename = 'assets/' + str(i) + ".jpg";
        imgs.push(loadImage(filename));
    }
}
//////////////////////////////////////////////////////////
function setup() {
    // create canvas with width of 2 images and height of 1 image from assets first image 0.jpg
    var cnv = createCanvas(imgs[0].width * 2, imgs[0].height);
    cnv.parent('canvas-holder');

    var scale = 0.7;
    var holder = document.getElementById('canvas-holder');
    var wrap = document.getElementById('canvas-wrap');

    cnv.style('transform', 'scale(' + scale + ')');
    cnv.style('transform-origin', 'top left');

    if (holder) {
        holder.style.width = width + 'px';
        holder.style.height = height + 'px';
        holder.style.display = 'block';
    }

    if (wrap) {
        wrap.style.width = (width * scale) + 'px';
        wrap.style.height = (height * scale) + 'px';
    }

    pixelDensity(1);

    // create empty avg img with correct width and height
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
    
    // create empty avgImgMouseXRelevent that transitions from photo on the left to avg photo based on mouse x
    avgImgMouseXRelevent = createGraphics(imgs[0].width, imgs[0].height);

    // seting up random photo on the left 
    photoLeftDisplayId = floor(random(0, 30)); // the bigest is 29 but p5 random in random(inclusive, exclusive)
}
//////////////////////////////////////////////////////////
function draw() {
    background(125); // setting background color 

    // draw first picutre on the left
    image(imgs[photoLeftDisplayId], 0, 0);


    // load pixels 
    for (let i = 0; i < numOfImages; i++) {
        imgs[i].loadPixels();
    }
    avgImg.loadPixels();
    

    // getting pixel colors for avg image

    var sumR = 0; // those vars will store avg pixel color for RGB 
    var sumG = 0;
    var sumB = 0;
  
    for (let i = 0; i < (avgImg.height * avgImg.width) * 4; i++){ // loop over pixels in avg photo to get avg best on imgs OR just red img commented for step 5
        // rubric step 5: create avg img to be red with looping over imgs[0] pixels, so by changing to red I need pixels in avg img be red, red is (255,0,0,255)
        // pixel stores information in 4 parts, R G B Alpha, to make red I need 255, 0,0,255
        //  avgImg.pixels[i] = 255; // this is R
        //  i++; // moving to next part of the same pixel
        //  avgImg.pixels[i] = 0; // this is G
        //  i++; // moving to next part of the same pixel
        //  avgImg.pixels[i] = 0; // this is B
        //  i++; // moving to next part of the same pixel
        //  avgImg.pixels[i] = 255; // this is Alpha
        
        
        for (let j = 0; j < numOfImages; j++){ // loop over that pixel in every image in imgs 
            sumR += imgs[j].pixels[i];
            sumG += imgs[j].pixels[i + 1];
            sumB += imgs[j].pixels[i + 2];
        }

        // calculate avg by deviding over number of images 
        sumR /= numOfImages;
        sumG /= numOfImages;
        sumB /= numOfImages;
        
        // put calculated pixels rgb in correct storing order 
        avgImg.pixels[i] = sumR; 
        i++;
        avgImg.pixels[i] = sumG; 
        i++;
        avgImg.pixels[i] = sumB;
        i++ // this one is to pass bit pixel data responsible for alpha value
        avgImg.pixels[i] = 255;  // alpha value
    }

    avgImg.updatePixels();

    // show image on the right 
    image(avgImg, avgImg.width, 0);
  
    noLoop();
}

function keyPressed() {
    // changing face to random from assets on the left when any key is pressed 
    photoLeftDisplayId = floor(random(0, 30)); // the bigest is 29 but p5 random in random(inclusive, exclusive)

    // since draw function does not loop lets call it to change the img on the left 
    draw();
}

function mouseMoved() {
    // second image transition between the randomly selected image and the average image based on the mouseX value
    // I was thinking to use lerp by first phrasing pixel data to RGB vectors  then lerp from random photo to avg based on mouse X value
    // but I decided its more eficient to not phrase the data and use simple map function for each rgb value of every pixel
    
    // load pixels 
    avgImgMouseXRelevent.loadPixels();
    
    // generate avgImgMouseXRelevent
    var mouseXLimit = min(mouseX, width); // this prevents the map value to get out of bound when mouse is out side of canvas 
    for (let i = 0; i < (avgImgMouseXRelevent.height * avgImgMouseXRelevent.width) * 4; i++) { // loop over pixels in avgImgMouseXRelevent
        // generade pixel data based on where is mouse and map it to values between pixel from photo on the left to avg photo 
        avgImgMouseXRelevent.pixels[i] = map(mouseXLimit, 0, width, imgs[photoLeftDisplayId].pixels[i], avgImg.pixels[i]);
    }

    avgImgMouseXRelevent.updatePixels();

    // show it on the right side, wich will replace currently presenting avgImg 
    image(avgImgMouseXRelevent, avgImgMouseXRelevent.width, 0);
}
