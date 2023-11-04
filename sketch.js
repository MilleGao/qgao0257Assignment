let colors = [];
var nums1 = [10, 100, 210, 320, 470, 500, 630, 700, 790];
var nums2 = [30, 100, 210, 300, 400, 550, 630, 750, 790];
let scaleX, scaleY;


function setup() {
  createCanvas(windowWidth, windowHeight);
  // noLoop();
  noStroke();

  let grayColor = color(150);  // Gray
  let blueColor = color(21, 29, 176);  // Blue
  let redColor = color(161, 7, 2);  // Red

  colors.push(grayColor);
  colors.push(blueColor);
  colors.push(redColor);
  

  scaleX = windowWidth / 800; 
  scaleY = windowHeight / 800;

  setTimeout(clearCanvas, 8000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  scaleX = windowWidth / 800;
  scaleY = windowHeight / 800;
}

function draw() {
  background(250);

  // Vertical rectangles
  for (let i = 1; i < 10; i++) {
    if (i == 2 || i == 4 || i == 7) {
      let x = frameCount/2 * i; // Adjust the speed by multiplying frameCount
      let y = 0;
      let w = width / 50;
      let h = height / 2;
      rect(x, y, w, h);
      //fill in small rects in random 3 colors
      for(let k = 0; k<15; k++){
        rect(x,random(0,h),w,20);
        fill(random(colors));
      }
      } else {
        let x = frameCount/2 * i; // Adjust the speed by multiplying frameCount
        let y = 0;
        let w = width / 50;
        let h = height;
        fill(255, 229, 6);
        rect(x, y, w, h);

      //fill in small rects in random 3 colors
      for(let k = 0; k<15; k++){
        rect(x,random(0,h),w,20);
        fill(random(colors));
      }
    }
    fill(255, 229, 6);
  }

  for (let j = 1; j < 8; j++) {
    if (j == 1 || j == 5 || j == 6) {
        let x = 0;
        let y = frameCount/2 * j;
        let w = width/2;
        let h =  height/40;
        rect(x,y,w,h);
      //fill in small rects in random 3 colors
      for(let k = 0; k< 15; k++){
        rect(random(0,w),y,20,h);
        fill(random(colors));
        }
    } else {
        x = 0;
        y = frameCount/2 * j;
        w = width;
        h = height/40;
      rect(x, y, w, h);
      //fill in small rects in random 3 colors
      for(let k = 0; k < 15; k++){
        rect(random(0,w),y,20,h)
        fill(random(colors));
        }
    }
    fill(255, 229, 6);
  }
  

  
  // Fixed position rectangles
  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[1]); //blue
    rect(nums1[i] * scaleX, nums2[i] * 3 * scaleY, 100 * scaleX, 70 * scaleY);
  }

  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[2]); //red
    rect(nums1[i] * scaleX, nums2[i] * 2 * scaleY, (100 + 50) * scaleX, 80 * scaleY);
  }

  for (let i = 0; i < 8; i++) {
    noStroke();
    fill(colors[2]); //red
    rect(nums1[i] * 2 * scaleX, nums2[i] * scaleY, 60 * scaleX, 50 * scaleY);
  }

  for (let i = 0; i < 6; i++) {
    noStroke();
    fill(colors[2]); //red
    rect(nums1[i] * 2 * scaleX, nums2[i] * scaleY, 60 * scaleX, 50 * scaleY);
  }

  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(colors[0]); //gray
    rect((nums1[i] * 2 + 20) * scaleX, (nums2[i] + 10) * scaleY, 30 * scaleX, 30 * scaleY);
  }

  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(255, 229, 6); //yellow
    rect((nums1[i] + 200) * scaleX, (nums2[i] + 200) * scaleY, 40 * scaleX, 80 * scaleY);
  }

  for (let i = 0; i < 10; i++) {
    noStroke();
    fill(colors[1]); //blue
    rect((nums1[i * 2] + 220) * scaleX, (nums2[i] + 400) * scaleY, 100 * scaleX, 80 * scaleY);
  }
}
function clearCanvas() {
  frameCount=0;
  clear(); 
  setTimeout(clearCanvas, 8000);
}