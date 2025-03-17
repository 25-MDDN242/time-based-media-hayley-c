/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

var r = 180;
var fieldArray = [];
var twelveDaisies = true;
var fullBloom = false;

// let radius = 10;
// let angle = 0;
// let speed = 0.01;

var angle = 0.0;
var sway = 0.0;
var period = 8;// makes the time longer with increase period value

function populate_fieldArray() {
 fieldArray = [
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
}

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

  background(78, 150, 77); // green background colour
  translate(width/2, height/2); // translate (0, 0) to canvas centre
  angleMode(DEGREES); // set angle mode to degrees

  populate_fieldArray();

  let secs = obj.seconds;
  let millis = obj.millis;
  let exactSeconds = secs + millis / 1000.0;
  let buzzing = map(exactSeconds, 0, 59, 0, 359); // seconds map for bee's path
  let heliotropic = map(obj.hours, 0, 23, 0, 359); // hours map for heliotropic sunflower

  // centre sunflower
  push();
  rotate(heliotropic); // heliotropic motion

  // sunflower shadow
  translate(0, 45); //offeset shadow
  shadow(); //shadow
  pop();

  push();
  grass(period);
  pop();

  // sunflower
  push();
  rotate(heliotropic); // heliotropic motion
  sunflower(); //sunflower
  sun(); //
  pop();


  console.log(obj.seconds_until_alarm || obj.seconds_until_alarm === undefined)
  if(obj.seconds_until_alarm < 0){
    push();
    twelveDaisies = true;
    daisyAlarm();
    pop();
  }
  else if (obj.seconds_until_alarm > 0){
    push();
    twelveDaisies = false;
    daisyAlarm();
    pop();
  }
  else {
    push();
    daisyAlarm();
    pop();
  }

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

function grass(period){

  var amplitude = 8; // distance of motion
  var angle = frameCount / period * TWO_PI; //period is 
  sway = cos(angle) * amplitude;

     let grassArray = [
    [-100, -100],
    [200, -100],
    [-40, 200],
    [-120, 80],
    [50, 140],
    [180, 60],
    [-160, 20],
    [-150, 180],
    [180, 190],
    [-170, -160],
    [-30, -210],
    [140, -190],
    [50, -90],
    [50, 140],
    [180, 60],
    [-160, 20],
    [-150, 180],
    [180, 190],
  ]

  for (let i = 0; i < grassArray.length; i++) {
    let x = grassArray[i][0]; // x coordinate
    let y = grassArray[i][1]; // y coordinate

    push();
    translate(x, y);
    noStroke();
    fill(3, 102, 30);
    beginShape();
    vertex(sway, 0);
    bezierVertex(0 + 13, 0 + 6, 0 + 13, 0 + 8, 0 + 18, 0 + 23);
    bezierVertex(0 + 10, 0 + 8, 0 + 12, 0 + 10, sway, 0);
    endShape();
    pop();
  }


  // stroke(3, 102, 30);
  // fill(3, 102, 30);

  //   push();
  //   translate(centerX, centerY)
  //   rotate (angle);
  //   // line(0, 0, radius, -15);
  //   noStroke();
  //   beginShape();
  //   vertex(0, 0);
  //   bezierVertex(radius - 13, -6, radius - 13, -8, radius - 18, -23);
  //   bezierVertex(radius - 10, -8, radius - 12, -10, 0, 0);
  //   endShape();
  //   angle = angle + speed;
  
  //   if (angle >= PI) {
  //     speed = -0.01;
  //   } else if (angle <= 0) {
  //     speed = 0.01;
  //   }
  
  //   pop();
  }

  //   noStroke();
  //   beginShape();
  //   vertex(x, y);
  //   bezierVertex(x + 13, y + 6, x + 13, y + 8, x + 18, y + 23);
  //   bezierVertex(x + 10, y + 8, x + 12, y + 10, x, y);
  //   endShape();
  //}

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

// bee's stinger
fill(0); // black colour
triangle(-5, -155 + random(-1, 1), -14, -150 + random(-1, 1), -5, -145 + random(-0.5, 0.5));

// bee's body
fill(250, 234, 95); // yellow colour
rect(-10, -7.5-150, 20, 15, 15)

// bee's stripes
fill(0); // black colour
rect(-4.5, -7.5-150, 3, 15) // top stripe
rect(1.5, -7.5-150, 3, 15) // bottom stripe

// bee's wings
fill(190, 227, 235, 0.75); // transparent light blue colour
bezier(0, 0-150, -17.5, 17.5-150, 17.5, 17.5-150, 0, 0-150); // right wing 
bezier(0, 0-150, -17.5, -17.5-150, 17.5, -17.5-150, 0, 0-150); // left wing

// bee's antennae
strokeWeight(1); // anntennae width
stroke(0); // black colour
// left curved antenna
beginShape();
vertex(8, -2.5-150);
quadraticVertex(12, -3-150, 14, -7-150);
endShape();
// right curved antenna
beginShape();
vertex(8, 2.5-150);
quadraticVertex(12, 3-150, 14, 7-150);
endShape();
}

function drawDaisy(x, y, isBloomed = false) {
  
  push();
  translate(x, y);
  noStroke();
  fill(255);

  let petalLength = -10;

  if(isBloomed === true) {
    petalLength -= frameCount * 0.1;
  }

    for (let i = 0; i <= 12; i++) {
      rotate(30);
      if(petalLength >= -25){
        bezier(0, -2, -9, petalLength, 9, petalLength, 0, -2);
      }
      if(isBloomed === true) {
        if (petalLength < -25) {
          petalLength = -25
        }
      }
    }
  
  fill(250, 234, 95);
  circle(0, 0, 10);
  pop();
}

function daisyAlarm(){
  if(twelveDaisies == true){
    for (let i = 0; i < fieldArray.length; i++) {
      let x = fieldArray[i][0]; // x coordinate
      let y = fieldArray[i][1]; // y coordinate

      drawDaisy(x, y, true);
      }
  } else {
    if (obj.minutes >= 0 && obj.minutes < 5){
      drawDaisy(fieldArray[0][0], fieldArray[0][1], true);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 5 && obj.minutes < 10){
      drawDaisy(fieldArray[1][0], fieldArray[1][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 10 && obj.minutes < 15){
      drawDaisy(fieldArray[2][0], fieldArray[2][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 15 && obj.minutes < 20){
      drawDaisy(fieldArray[3][0], fieldArray[3][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 20 && obj.minutes < 25){
      drawDaisy(fieldArray[4][0], fieldArray[4][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 25 && obj.minutes < 30){
      drawDaisy(fieldArray[5][0], fieldArray[5][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 30 && obj.minutes < 35){
      drawDaisy(fieldArray[6][0], fieldArray[6][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 35 && obj.minutes < 40){
      drawDaisy(fieldArray[7][0], fieldArray[7][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 40 && obj.minutes < 45){
      drawDaisy(fieldArray[8][0], fieldArray[8][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 45 && obj.minutes < 50){
      drawDaisy(fieldArray[9][0], fieldArray[9][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 50 && obj.minutes < 55){
      drawDaisy(fieldArray[10][0], fieldArray[10][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[11][0], fieldArray[11][1]);
    } else if (obj.minutes >= 55 && obj.minutes <= 59){
      drawDaisy(fieldArray[11][0], fieldArray[11][1], true);
      drawDaisy(fieldArray[0][0], fieldArray[0][1]);
      drawDaisy(fieldArray[1][0], fieldArray[1][1]);
      drawDaisy(fieldArray[2][0], fieldArray[2][1]);
      drawDaisy(fieldArray[3][0], fieldArray[3][1]);
      drawDaisy(fieldArray[4][0], fieldArray[4][1]);
      drawDaisy(fieldArray[5][0], fieldArray[5][1]);
      drawDaisy(fieldArray[6][0], fieldArray[6][1]);
      drawDaisy(fieldArray[7][0], fieldArray[7][1]);
      drawDaisy(fieldArray[8][0], fieldArray[8][1]);
      drawDaisy(fieldArray[9][0], fieldArray[9][1]);
      drawDaisy(fieldArray[10][0], fieldArray[10][1]);
    }
  }
}