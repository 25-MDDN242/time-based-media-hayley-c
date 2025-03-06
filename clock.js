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

  background(78, 150, 77);
  translate(width/2, height/2);
  angleMode(DEGREES);

  var x = startX + scalar * cos(angle);
  var y = startY + scalar * sin(angle);

  // let lilypadSpin = map(obj.minutes, 0, 59, 0, 359);
  // rotate(lilypadSpin);
  // centreFlower(x, y);

  let koiSwim = map(obj.seconds, 0, 59, 0, 359);
  let heliotropic = map(obj.hours, 0, 23, 0, 359);
  // var koiX = startXKoi + scalarKoi * cos(angle);
  // var koiY = startYKoi + scalarKoi * sin(angle);

  push();
  rotate(heliotropic);
  push();
  translate(0, 45);
  shadow();
  pop();
  sunflower();
  sun();
  pop();

  push();
  rotate(koiSwim);
  koi();
  pop();


  // angle++;

  translate(-width/2, -height/2);
  push();
  noStroke();
  fill(255);
  rect(0, 0, height/2, height);
  rect((width+height)/2, 0, height/2, height);
  pop();
}

function sunflower() {
  noStroke();

  fill(77, 44, 11);  
  ellipse(0, 0, 80, 50);

  fill(232, 192, 14);

  // 12 o'clock petal
  bezier(-5, -21, -45, -130, 45, -130, 5, -21);

  // 1 o'clock petal
  push();
  rotate(30);
  bezier(-2, -22, -45, -133, 45, -133, 8, -24);
  pop();

  // 2 o'clock petal
  push();
  rotate(60);
  bezier(-1, -28, -45, -138, 45, -138, 9, -32);
  pop();

  // 3 o'clock petal
  push();
  rotate(90);
  bezier(-5, -35, -45, -145, 45, -145, 5, -35);
  pop();

  // 9 o'clock petal
  push();
  rotate(270);
  bezier(-5, -35, -45, -145, 45, -145, 5, -35);
  pop();

  // 10 o'clock petal
  push();
  rotate(300);
  bezier(-9, -32, -45, -138, 45, -138, 1, -28);
  pop();

  // 11 o'clock petal
  push();
  rotate(330);
  bezier(-8, -24, -45, -133, 45, -133, 2, -22);
  pop();

  // 4 o'clock petal
  push();
  rotate(120);
  bezier(-9.5, -32, -35, -125, 35, -125, 1.5, -28);
  pop();

  // 5 o'clock petal
  push();
  rotate(150);
  bezier(-8.5, -24, -35, -110, 35, -110, 2.5, -22);
  pop();

  // 6 o'clock petal
  push();
  rotate(180);
  bezier(-5.5, -22, -35, -105, 35, -105, 5.5, -22);
  pop();

  // 7 o'clock petal
  push();
  rotate(210);
  bezier(-2.5, -22, -35, -110, 35, -110, 8.5, -24);
  pop();

  // 8 o'clock petal
  push();
  rotate(240);
  bezier(-1.5, -28, -35, -125, 35, -125, 9.5, -32);
  pop();

  // noFill();
  // stroke(255)
  // strokeWeight(3)
  // ellipse(0, - 25, 250, 125);

}

function shadow() {

  noStroke();

  fill(30, 64, 29);  
  ellipse(0, 0, 80, 50);

  // 12 o'clock petal
  bezier(-5, -21, -45, -130, 45, -130, 5, -21);

  // 1 o'clock petal
  push();
  rotate(30);
  bezier(-2, -22, -45, -133, 45, -133, 8, -24);
  pop();

  // 2 o'clock petal
  push();
  rotate(60);
  bezier(-1, -28, -45, -138, 45, -138, 9, -32);
  pop();

  // 3 o'clock petal
  push();
  rotate(90);
  bezier(-5, -35, -45, -145, 45, -145, 5, -35);
  pop();

  // 9 o'clock petal
  push();
  rotate(270);
  bezier(-5, -35, -45, -145, 45, -145, 5, -35);
  pop();

  // 10 o'clock petal
  push();
  rotate(300);
  bezier(-9, -32, -45, -138, 45, -138, 1, -28);
  pop();

  // 11 o'clock petal
  push();
  rotate(330);
  bezier(-8, -24, -45, -133, 45, -133, 2, -22);
  pop();

  // 4 o'clock petal
  push();
  rotate(120);
  bezier(-9.5, -32, -35, -125, 35, -125, 1.5, -28);
  pop();

  // 5 o'clock petal
  push();
  rotate(150);
  bezier(-8.5, -24, -35, -110, 35, -110, 2.5, -22);
  pop();

  // 6 o'clock petal
  push();
  rotate(180);
  bezier(-5.5, -22, -35, -105, 35, -105, 5.5, -22);
  pop();

  // 7 o'clock petal
  push();
  rotate(210);
  bezier(-2.5, -22, -35, -110, 35, -110, 8.5, -24);
  pop();

  // 8 o'clock petal
  push();
  rotate(240);
  bezier(-1.5, -28, -35, -125, 35, -125, 9.5, -32);
  pop();

  // noFill();
  // stroke(255)
  // strokeWeight(3)
  // ellipse(0, - 25, 250, 125);

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

function sun(){
  noStroke();
  colorMode(RGB, 255, 255, 255, 1);
  fill(255, 238, 128, 0.5);
  circle(0, -375, 275);
}

function koi(){
  noStroke();
  fill(255);
  ellipse(0, -150, 20, 12)
}