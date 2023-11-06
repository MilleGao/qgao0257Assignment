let colors = [];
var nums1 = [10, 100, 210, 320, 470, 500, 630, 700, 790];
var nums2 = [30, 100, 210, 300, 400, 550, 630, 750, 790];
let scaleX, scaleY;
let speed = 1; // initial speed
let maxSpeed = 4; 
let rectangles = []; 
let newRectangles = []; // store flip rects
let backgroundColor;
let flipDuration = 6000; 
let flipInterval = 3000; 


function setup() {
  createCanvas(windowWidth, windowHeight);
  // noLoop();
  noStroke();
  backgroundColor = color(242, 240, 235);
  let grayColor = color(150);  // Gray
  let blueColor = color(21, 29, 176);  // Blue
  let redColor = color(161, 7, 2);  // Red

  colors.push(grayColor);
  colors.push(blueColor);
  colors.push(redColor);
  

  scaleX = windowWidth / 800; 
  scaleY = windowHeight / 800;

  
  // initialise yellow blocks
  for (let i = 0; i < 10; i++) {
    let rectInfo = {
      x: (nums1[i] + 200) * scaleX,
      y: (nums2[i] + 200) * scaleY + frameCount * speed,
      w: 40 * scaleX,
      h: 80 * scaleY,
      speedY: speed * 5,
      isFlipping: false, // check if is flipping
      flipStartTime: 0 // start from 0
    };
    rectangles.push(rectInfo);
  }
  setInterval(startFlip, flipInterval); 
  setTimeout(clearCanvas, 6000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  scaleX = windowWidth / 800;
  scaleY = windowHeight / 800;
}

function draw() {
  // background(250);
  if (frameCount <= 360) { // 6s
    let darkeningAmount = frameCount / 360; 
    backgroundColor = color(255 * (1 - darkeningAmount)); // darken rgb

    background(backgroundColor);
  } else {
    background(0); 
  }

  // Vertical rectangles
  for (let i = 1; i < 10; i++) {
    if (i == 2 || i == 4 || i == 7) {
      let x = width / 40 * i * 5;
      let y = 0;
      let w = width / 50;
      let h = height / 2;
      rect(x, y, w, h);
      //fill in small rects in random 3 colors
      for (let k = 0; k < 15; k++) {
        rect(x, random(0, h), w, 20);
        fill(random(colors));
      }
    } else {
      let x = width / 50 * i * 5;
      let y = 0;
      let w = width / 50;
      let h = height;
      fill(255, 229, 6);
      rect(x, y, w, h);

      //fill in small rects in random 3 colors
      for (let k = 0; k < 15; k++) {
        rect(x, random(0, h), w, 20);
        fill(random(colors));
      }
    }
    fill(255, 229, 6);
  }

  // Horizontal rectangles
  for (let j = 1; j < 8; j++) {
    if (j == 1 || j == 5 || j == 6) {
      let x = 0;
      let y = height / 8 * j;
      let w = width / 2;
      let h = height / 40;
      rect(x, y, w, h);
      //fill in small rects in random 3 colors
      for (let k = 0; k < 15; k++) {
        rect(random(0, w), y, 20, h);
        fill(random(colors));
      }
    } else {
      x = 0;
      y = height / 8 * j;
      w = width;
      h = height / 40;
      rect(x, y, w, h);
      //fill in small rects in random 3 colors
      for (let k = 0; k < 15; k++) {
        rect(random(0, w), y, 20, h)
        fill(random(colors));
      }
    }
    fill(255, 229, 6);
  }

  
  // Fixed position rectangles
  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[1]); // Blue
    let x = nums1[i] * scaleX;
    let y = nums2[i] * scaleY*3 + frameCount/speed; // Adjust the Y position based on time
    rect(x, y, 100 * scaleX, 70 * scaleY);
  }


  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[2]); //red
    let x = nums1[i] * scaleX;
    let y = nums2[i] * 2 * scaleY + frameCount/speed;
    rect(x,y, (100 + 50) * scaleX, 80 * scaleY);
  }

  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[2]); //red
    let x = nums1[i] * 2 * scaleX + frameCount/speed;
    let y = nums2[i] * scaleY;
    rect(x,y, 60 * scaleX, 50 * scaleY);
  }

  for (let i = 0; i < 6; i++) {
    noStroke();
    fill(colors[2]); //red
    let x = nums1[i] * 2 * scaleX + frameCount/speed;
    let y = nums2[i] * scaleY;
    rect(x,y , 60 * scaleX, 50 * scaleY);
  }

  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(colors[0]); //gray
    let x = (nums1[i] * 2 + 20) * scaleX +frameCount/speed;
    let y = (nums2[i] + 10) * scaleY
    rect(x, y, 30 * scaleX, 30 * scaleY);
  }



  // Update the position of yellow rectangles based on time and speed
   for (let i = 0; i < newRectangles.length; i++) {
    let rectInfo = newRectangles[i];
    noStroke();
    if (rectInfo.isFlipping) {
      // flip and change to white
      if (frameCount % 120 < 60) {
        fill(255);
      } else {
        fill(255, 229, 6);
      }

      let currentTime = millis() - rectInfo.flipStartTime;
      let progress = constrain(currentTime / flipDuration, 0, 1);//min 0, max 1
      let angle = map(progress, 0, 1, 0, PI);
      push();
      translate(rectInfo.x + rectInfo.w / 2, rectInfo.y + rectInfo.h / 2);//(0,0) change to rects center
      rotate(angle);
      rect(-rectInfo.w / 2, -rectInfo.h / 2, rectInfo.w, rectInfo.h);
      pop();
      if (progress >= 1) {
        rectInfo.isFlipping = false;
      }
    } else {
      // keep in yellow
      fill(255, 229, 6);
      rect(rectInfo.x, rectInfo.y, rectInfo.w, rectInfo.h);
    }
  }

  // update rects position
  newRectangles = [];
  for (let i = 0; i < rectangles.length; i++) {
    let rectInfo = rectangles[i];
    let x = rectInfo.x;
    let y = rectInfo.y;
    let speedY = rectInfo.speedY;

    if (y + rectInfo.h >= 0 && y - rectInfo.h <= height) {
      // check if in the canva, push into array
      newRectangles.push(rectInfo);
    }

    if (y + rectInfo.h < 0 || y - rectInfo.h > height) {
      speedY *= -1;
      rectInfo.isFlipping = true;
      rectInfo.flipStartTime = millis();
    }

    y += speedY;
    rectangles[i].y = y;
    rectangles[i].speedY = speedY;
  }


  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(colors[1]); //blue
    let x = nums1[i * 2] + 220 * scaleX;
    let y = (nums2[i] + 400) * scaleY + frameCount / speed;
    rect(x, y, 100 * scaleX, 80 * scaleY);
  }
  frameCount++;
  }

function startFlip() {
  for (let i = 0; i < newRectangles.length; i++) {
    let rectInfo = newRectangles[i];
    if (!rectInfo.isFlipping) {
      rectInfo.isFlipping = true;
      rectInfo.flipStartTime = millis();
    }
  }
}
function clearCanvas() {
  frameCount=0;
  background(backgroundColor); 
  clear(); 
  setTimeout(clearCanvas, 6000);
}