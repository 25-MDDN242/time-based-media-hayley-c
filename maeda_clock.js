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
  let secondsToDegrees = map(obj.seconds, 0, 59, 0, 359)

  // set origin point in canvas's centre
  translate(width/2, height/2);

  // animated rotation
  rotate(secondsToDegrees);

  // draw digtial clock function
  clockDigital();

}

// // digital clock
// function clockDigital() {
//   // AM
//   textSize(25)
//   text('AM', 0, 0);

//   // hours
//   textSize(25)
//   text('12', 0, 50);

//   // colon
//   textSize(25)
//   text(':', 0, 80);

//   // minutes
//   textSize(25)
//   text('01', 0, 110);
// }

// digital clock
function clockDigital() {
  // set circle style
  stroke(255);
  strokeWeight(8);

  point(100, -30);
  point(100, -20);
  point(100, -10);
  point(100, 0);
  point(100, 10);
  point(100, 20);
  point(100, 30);
  point(110, 20);
  
  point(50, -30);
  point(50, -20);
  point(50, -10);
  point(50, 0);
  point(50, 10);
  point(50, 20);
  point(50, 30);
  point(60, 20);

  point(0, -20);
  point(0, 20);

  point(-40, -30);
  point(-50, -30);
  point(-60, -30);
  point(-70, -20);
  point(-70, -10);
  point(-70, 0);
  point(-70, 10);
  point(-70, 20);
  point(-40, 30);
  point(-50, 30);
  point(-60, 30);
  point(-30, -20);
  point(-30, -10);
  point(-30, 0);
  point(-30, 10);
  point(-30, 20);
  
  point(-90, -30);
  point(-100, -30);
  point(-110, -30);
  point(-120, -20);
  point(-120, -10);
  point(-120, 0);
  point(-120, 10);
  point(-120, 20);
  point(-90, 30);
  point(-100, 30);
  point(-110, 30);
  point(-80, -20);
  point(-80, -10);
  point(-80, 0);
  point(-80, 10);
  point(-80, 20);
}