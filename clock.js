/*
 * use p5.js to draw a clock on a 960x500 canvas
 */


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

  background(141, 142, 143);

  push();
  translate(width/2, height/2);
  noFill();
  strokeWeight(1)
  stroke(75, 77, 89);
  ellipse(0, 10, 610, 310);
  ellipse(0, 10, 590, 290);
  strokeWeight(10)
  stroke(93, 95, 110);
  ellipse(0, 10, 600, 300);
  ellipse(0, 0, 600, 300);
  ellipse(0, -10, 600, 300);
  strokeWeight(1)
  stroke(75, 77, 89);
  ellipse(0, -10, 590, 290);
  ellipse(0, -10, 610, 310);
  pop();

  centreFlower();

}

function centreFlower() {
  colorMode(RGB, 255, 255, 255, 1);
  ellipseMode(CORNER);
  angleMode(DEGREES);
  // let petalLength = map(obj.seconds, 0, 359, 0, 30)
  push();
  noStroke();
  fill(210, 231, 250, 0.2);
  translate(width/2, height/2);
  for (let i = 0; i <= 30; i++) {
    rotate(12);
    ellipse(0, 0, 25, 150);

    // if(petalLength > 30) {
    //   petalLength = 30
    // }
  
  }
  fill(239, 230, 252);
  circle(0, 0, 25);
  pop();
}

function miniFlower() {
  colorMode(RGB, 255, 255, 255, 1);
  ellipseMode(CENTER);
  angleMode(DEGREES);
  // let petalLength = map(obj.seconds, 0, 359, 0, 30)
  push();
  noStroke();
  fill(210, 231, 250, 0.2);
  translate(width/2, height/2);
  for (let i = 0; i <= 12; i++) {
    rotate(30);
    ellipse(0, 0, 5,0+frameCount*0.05);

    // if(petalLength > 30) {
    //   petalLength = 30
    // }
  
  }
  fill(239, 230, 252);
  circle(0, 0, 5);
  pop();
}
