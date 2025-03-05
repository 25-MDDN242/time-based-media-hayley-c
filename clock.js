/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

var angle = 0;	// initialize angle variable
var scalar = 10;  // set the radius of circle
var startX = 0;	// set the x-coordinate for the circle center
var startY = 0;	// set the y-coordinate for the circle center

function draw_clock(obj) {
  // draw your own clock here based on the values of obj:
  //    obj.hours goes from 0-23
  //    obj.minutes goes from 0-59
  //    obj.seconds goes from 0-59
  //    obj.millis goes from 0-999
  //    obj.seconds_until_alarm is:
  //        < 0 if no alarm is set
  //        = 0 if the alarm is currently going off
  //        > 0 --> the number of seconds until alarm should go off

  background(30, 60, 82);
  translate(width/2, height/2);
  angleMode(DEGREES);

  var x = startX + scalar * cos(angle);
  var y = startY + scalar * sin(angle);

  let lilypadSpin = map(obj.minutes, 0, 59, 0, 359);
  rotate(lilypadSpin);
  centreFlower(x, y);

  angle++;

}

function centreFlower(x, y) {
  colorMode(RGB, 255, 255, 255, 1);
  angleMode(DEGREES);
  push();
  translate(x, y);
  noStroke();
  fill(34, 112, 51);
  arc(0, 0, 250, 250, -70, 270);
  fill(250, 172, 231, 0.4);
  for (let i = 0; i <= 12; i++) {
    rotate(30);
    ellipse(0, 0, 40, 100 + obj.seconds);
  }
  fill(240, 209, 36);
  ellipse(0, 0, 50);
  pop();
}