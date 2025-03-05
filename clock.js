/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

var angle = 0;	// initialize angle variable
var scalar = 10;  // set the radius of circle
var startX = 0;	// set the x-coordinate for the circle center
var startY = 0;	// set the y-coordinate for the circle center

var scalarKoi = 175;  // set the radius of circle
var startXKoi = 0;	// set the x-coordinate for the circle center
var startYKoi = 0;	// set the y-coordinate for the circle center

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

  // let lilypadSpin = map(obj.minutes, 0, 59, 0, 359);
  // rotate(lilypadSpin);
  // centreFlower(x, y);

  let koiSwim = map(obj.seconds, 0, 59, 0, 359);
  var koiX = startXKoi + scalarKoi * cos(koiSwim);
  var koiY = startYKoi + scalarKoi * sin(koiSwim);
  // var koiX = startXKoi + scalarKoi * cos(angle);
  // var koiY = startYKoi + scalarKoi * sin(angle);
  
  sunflower();

  rotate(koiSwim);
  koi()


  angle++;

}

function sunflower() {
  noStroke();
  fill(232, 192, 14);
  ellipse(0, -75, 50, 125)
  fill(77, 44, 11);  
  ellipse(0, 0, 80, 50);

  noFill();
  stroke(255)
  strokeWeight(3)
  ellipse(0, - 25, 250, 125);

}

// function centreFlower(x, y) {
//   colorMode(RGB, 255, 255, 255, 1);
//   angleMode(DEGREES);
//   push();
//   translate(x, y);
//   noStroke();
//   fill(34, 112, 51);
//   arc(0, 0, 250, 250, -70, 270);
//   fill(250, 172, 231, 0.4);
//   for (let i = 0; i <= 12; i++) {
//     rotate(30);
//     ellipse(0, 0, 40, 100 + obj.seconds);
//   }
//   fill(240, 209, 36);
//   ellipse(0, 0, 50);
//   pop();
// }

function koi(koiX, koiY) {
  noStroke();
  fill(255);
  translate(koiX, koiY);
  ellipse(0, 200, 60, 40)
}