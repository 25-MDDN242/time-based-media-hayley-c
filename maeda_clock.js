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
  strokeWeight(3.5);

  colorMode(RGB, 255, 255, 255, 1);
  let d = 3.5;
  strokeWeight(0);
  fill(255);

  // A
  circle(-25, -10, d);
  circle(-25, -5, d);
  circle(-25, 0, d);
  circle(-25, 5, d);
  circle(-25, 10, d);
  circle(-25, 15, d);
  circle(-20, -15, d);
  circle(-15, -15, d);
  circle(-10, -15, d);
  circle(-20, 0, d);
  circle(-15, 0, d);
  circle(-10, 0, d);
  circle(-5, -10, d);
  circle(-5, -5, d);
  circle(-5, 0, d);
  circle(-5, 5, d);
  circle(-5, 10, d);
  circle(-5, 15, d);

  // M
  circle(25, -15, d);
  circle(25, -10, d);
  circle(25, -5, d);
  circle(25, 0, d);
  circle(25, 5, d);
  circle(25, 10, d);
  circle(25, 15, d);
  circle(20, -10, d);
  circle(15, -5, d);
  circle(10, -10, d);
  circle(5, -15, d);
  circle(5, -10, d);
  circle(5, -5, d);
  circle(5, 0, d);
  circle(5, 5, d);
  circle(5, 10, d);
  circle(5, 15, d);

  // 4
  circle(10, 60, d);
  circle(10, 65, d);
  circle(10, 70, d);
  circle(10, 75, d);
  circle(10, 80, d);
  circle(10, 85, d);
  circle(10, 90, d);
  circle(5, 75, d);
  circle(0, 75, d);
  circle(-5, 75, d);
  circle(-10, 75, d);
  circle(-10, 70, d);
  circle(-10, 65, d);
  circle(-10, 60, d);

  // :
  circle(0, 110, d);
  circle(0, 125, d);

  // 0
  circle(0, 145, d);
  circle(5, 145, d);
  circle(10, 150, d);
  circle(10, 155, d);
  circle(10, 160, d);
  circle(10, 165, d);
  circle(10, 170, d);
  circle(5, 175, d);
  circle(0, 175, d);
  circle(-5, 145, d);
  circle(-10, 150, d);
  circle(-10, 155, d);
  circle(-10, 160, d);
  circle(-10, 165, d);
  circle(-10, 170, d);
  circle(-5, 175, d);

  // 8
  circle(0, 195, d);
  circle(5, 195, d);
  circle(10, 200, d);
  circle(10, 205, d);
  circle(10, 215, d);
  circle(10, 220, d);
  circle(5, 225, d);
  circle(-5, 210, d);
  circle(0, 210, d);
  circle(5, 210, d);
  circle(0, 225, d);
  circle(-5, 195, d);
  circle(-10, 200, d);
  circle(-10, 205, d);
  circle(-10, 215, d);
  circle(-10, 220, d);
  circle(-5, 225, d);
}