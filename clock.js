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

  background(78, 150, 77);
  translate(width/2, height/2);
  angleMode(DEGREES);
  
  let buzzing = map(obj.seconds, 0, 59, 0, 359); // seconds map for bee's path
  let heliotropic = map(obj.hours, 0, 23, 0, 359); // hours map for heliotropic sunflower

  console.log(obj.seconds_until_alarm || obj.seconds_until_alarm === undefined)
  if(obj.seconds_until_alarm < 0){
    push();
    daisyAlarm();
    pop();
    }
    else if (obj.seconds_until_alarm > 0){
      push();
      daisyField();
      pop();
    }
    else {
      // push();
      // daisy(0, -150);
      // pop();
    }

      // centre sunflower
      push();
      rotate(heliotropic); // heliotropic motion
      push();

      // sunflower shadow
      translate(0, 45); //offeset shadow
      shadow(); //shadow
      pop();

      // sunflower
      sunflower(); //sunflower
      sun(); //
      pop();
    
      //bee
      push();
      rotate(buzzing); // rotating bee circle motion
      bee(); // bee with spinning motion
      pop();
    
      // padding
      translate(-width/2, -height/2); // translate (0, 0) to centre of canvas
      push();
      noStroke(); // no stroke weight
      fill(255); // white colour
      rect(0, 0, height/2, height); // left rectangle
      rect((width+height)/2, 0, height/2, height); // right rectangle
      pop();
}

function sunflower() {
  noStroke();

  fill(77, 44, 11); // brown colour 
  ellipse(0, 0, 80, 50); // disk floret

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
}

function shadow() {

  noStroke(); // no outline

  fill(30, 64, 29); // dark green colour
  ellipse(0, 0, 80, 50); // disk floret

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
}

function sun(){
  noStroke();
  colorMode(RGB, 255, 255, 255, 1);
  fill(255, 238, 128, 0.5);
  circle(0, -375, 275);
}

function bee(){
  colorMode(RGB, 255, 255, 255, 1);
  noStroke();
  fill(0);
  // ellipse(0, -150, 20, 12)
  triangle(-5, -155, -14, -150, -5, -145);
  fill(250, 234, 95);
  rect(-10, -7.5-150, 20, 15, 15)
  fill(0);
  rect(-4.5, -7.5-150, 3, 15)
  rect(1.5, -7.5-150, 3, 15)
  fill(190, 227, 235, 0.75);
  bezier(0, 0-150, -17.5, 17.5-150, 17.5, 17.5-150, 0, 0-150);
  bezier(0, 0-150, -17.5, -17.5-150, 17.5, -17.5-150, 0, 0-150);
  noFill()
  strokeWeight(1);
  stroke(0);
  beginShape();
  vertex(8, -2.5-150);
  quadraticVertex(12, -3-150, 14, -7-150);
  endShape();
  beginShape();
  vertex(8, 2.5-150);
  quadraticVertex(12, 3-150, 14, 7-150);
  endShape();
}

function daisy(x, y){
  push();
  translate(x, y);
  noStroke();
  fill(255);

  for (let i = 0; i <= 12; i++) {
  rotate(30);
  bezier(0, -2, -9, -25, 9, -25, 0, -2);
  }

  fill(250, 234, 95);
  circle(0, 0, 10);
  pop()

}

function daisyAlarm(){

  let r = 180;
  // draws daisies at [x, y]
  let fieldArray = [
    [0, -r], // 0 - 4 minutes
    [r*sin(30), -r*cos(30)], // 5 - 9 minutes
    [r*cos(30), -r*sin(30)], // 10 - 14 minutes
    [r, 0], // 15 - 19 minutes
    [r*cos(30), r*sin(30)], // 20 - 24 minutes
    [r*sin(30), r*cos(30)], // 25 - 29 minutes
    [0, r], // 30 - 34 minutes
    [-r*sin(30), r*cos(30)], // 35 - 39 minutes
    [-r*cos(30), r*sin(30)], // 40 - 44 minutes
    [-r, 0], // 45 - 49 minutes
    [-r*sin(30), -r*cos(30)], // 50 - 54 minutes
    [-r*cos(30), -r*sin(30)], // 55 - 59 minutes
  ]

  for (let i = 0; i < fieldArray.length; i++) {
    let x = fieldArray[i][0]; // x coordinate
    let y = fieldArray[i][1]; // y coordinate

    daisy(x, y);
  }
}

function daisyField(){

//   let r = 180;
//   // // draws daisies at [x, y]
//   // let minuteDaisy = [
//   //   [0, -r], // 0 - 4 minutes
//   //   [r*sin(30), -r*cos(30)], // 5 - 9 minutes
//   //   [r*cos(30), -r*sin(30)], // 10 - 14 minutes
//   //   [r, 0], // 15 - 19 minutes
//   //   [r*cos(30), r*sin(30)], // 20 - 24 minutes
//   //   [r*sin(30), r*cos(30)], // 25 - 29 minutes
//   //   [0, r], // 30 - 34 minutes
//   //   [-r*sin(30), r*cos(30)], // 35 - 39 minutes
//   //   [-r*cos(30), r*sin(30)], // 40 - 44 minutes
//   //   [-r, 0], // 45 - 49 minutes
//   //   [-r*sin(30), -r*cos(30)], // 50 - 54 minutes
//   //   [-r*cos(30), -r*sin(30)], // 55 - 59 minutes
//   // ]

  // 5 - 9 minutes
  if(obj.minutes >= 5 && obj.minutes < 9) {
  daisy(r*sin(30), -r*cos(30));
  }
  // 10 - 14 minutes
//   // else if (obj.minutes >= 10 && obj.minutes < 14) {
//   // daisy(r*cos(30), -r*sin(30)I)
//   //}
  // 15 - 19 minutes
//   else if (obj.minutes >= 15 && obj.minutes < 19) {
//   daisy(150, 0)
//   }
//   // 20 - 24 minutes
//   // else if (obj.minutes >= 20 && obj.minutes < 24) {
//   // daisy()
//   //}
  // 25 - 29 minutes
//   // else if (obj.minutes >= 25 && obj.minutes < 29) {
//   // daisy()
//   //}
  // 30 - 34 minutes
//   // else if (obj.minutes >= 30 && obj.minutes < 34) {
//   // daisy()
//   //}
  // 35 - 39 minutes
//   // else if (obj.minutes >= 35 && obj.minutes < 39) {
//   // daisy()
//   //}
  // 40 - 44 minutes
//   // else if (obj.minutes >= 40 && obj.minutes < 44) {
//   // daisy()
//   //}
  // 45 - 49 minutes
//   else if (obj.minutes >= 45 && obj.minutes < 49) {
//   daisy(-150, 0)
//   }
  // 50 - 54 minutes
//   // else if (obj.minutes >= 50 && obj.minutes < 54) {
//   // daisy()
//   //}
//   // 55 - 59 minutes
//   else if (obj.minutes >= 55 && obj.minutes < 59) {
//   daisy()
//   }
//   // 0 - 4 minutes
//   else{
//   daisy(0, -r)
//   }
}