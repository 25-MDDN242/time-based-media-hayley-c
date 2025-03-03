// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {
  // YOUR MAIN CLOCK CODE GOES HERE
  background(50); //  beige
  fill(200); // dark grey
  textSize(40);
  textAlign(CENTER, CENTER);
  // text("YOUR MAEDA CLOCK CODE GOES HERE", width/2, height/2);

  //set angle mode to degrees
  angleMode(DEGREES);
  let secondsToDegrees = map(obj.seconds, 0, 59, 0, 359);

  // set origin circle in canvas's centre
  translate(width/2, height/2);

  // animated rotation
  rotate(secondsToDegrees);


  // draw digtial clock function
  clockDigital();

}

// digital clock
function clockDigital() {

  // set circle style
  colorMode(RGB, 255, 255, 255, 1); // RBGA colour mode
  strokeWeight(0); // no outline
  fill(167, 209, 232); // light blue colour

  // coordinates array of circle font
  let timeArray = [
  
  // A
  [-25, -10],
  [-25, -5],
  [-25, 0],
  [-25, 5],
  [-25, 10],
  [-25, 15],
  [-20, -15],
  [-15, -15],
  [-10, -15],
  [-20, 0],
  [-15, 0],
  [-10, 0],
  [-5, -10],
  [-5, -5],
  [-5, 0],
  [-5, 5],
  [-5, 10],
  [-5, 15],

  // M
  [25, -15],
  [25, -10],
  [25, -5],
  [25, 0],
  [25, 5],
  [25, 10],
  [25, 15],
  [20, -10],
  [15, -5],
  [10, -10],
  [5, -15],
  [5, -10],
  [5, -5],
  [5, 0],
  [5, 5],
  [5, 10],
  [5, 15],

  // 4
  [10, 60],
  [10, 65],
  [10, 70],
  [10, 75],
  [10, 80],
  [10, 85],
  [10, 90],
  [5, 75],
  [0, 75],
  [-5, 75],
  [-10, 75],
  [-10, 70],
  [-10, 65],
  [-10, 60],

  // :
  [0, 110],
  [0, 125],

  // 0
  [0, 145],
  [5, 145],
  [10, 150],
  [10, 155],
  [10, 160],
  [10, 165],
  [10, 170],
  [5, 175],
  [0, 175],
  [-5, 145],
  [-10, 150],
  [-10, 155],
  [-10, 160],
  [-10, 165],
  [-10, 170],
  [-5, 175],

  // 8
  [0, 195],
  [5, 195],
  [10, 200],
  [10, 205],
  [10, 215],
  [10, 220],
  [5, 225],
  [-5, 210],
  [0, 210],
  [5, 210],
  [0, 225],
  [-5, 195],
  [-10, 200],
  [-10, 205],
  [-10, 215],
  [-10, 220],
  [-5, 225],

  ];

  // adding x and y coordinate elements to the array
  for (let i = 0; i < timeArray.length; i++) {
    let x = timeArray[i][0]; // x coordinate
    let y = timeArray[i][1]; // y coordinate
    circle(x, y, 3.5); // 3.5 diameter circle
  }
}