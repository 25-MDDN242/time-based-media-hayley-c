/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

var r = 180;
var daisyArray = [];
var twelveDaisies = true;
var fullBloom = false;

var angle = 0.0;
var sway = 0.0;
var period = 8;// makes the time longer with increase period value

function populate_daisyArray() {
 daisyArray = [
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
  //console.log(obj.seconds_until_alarm )
  translate(width/2, height/2); // translate (0, 0) to canvas centre
  angleMode(DEGREES); // set angle mode to degrees

  populate_daisyArray();

  let secs = obj.seconds;
  let millis = obj.millis;
  let exactSeconds = secs + millis / 1000.0;
  let buzzing = map(exactSeconds, 0, 59, 0, 359); // seconds map for bee's path
  let heliotropic = map(obj.hours, 0, 23/2, 0, 360); // hours map for heliotropic sunflower

  // multicoloured grass field
  push();
  fill(3, 102, 30); 
  grass(period);
  translate(60, -170)
  grass(period);
  translate(40, 160);
  fill(31, 125, 58);
  grass(period);
  translate(-190, -190);
  fill(38, 102, 56);
  grass(period);
  translate(-30, 54);
  fill(60, 133, 80);
  grass(period);
  translate(-10, 150);
  fill(13, 74, 30);
  grass(period);
  pop();


  // centre sunflower
  push();
  rotate(heliotropic); // heliotropic motion

  push();
  translate(0, 45); //offeset shadow
  shadow(); // sunflower shadow
  pop();

  sunflower(); // sunflower
  sun(); // sun
  pop();

  console.log(obj.seconds_until_alarm || obj.seconds_until_alarm === undefined)
 
  if(obj.seconds_until_alarm < 0){
    push();
    twelveDaisies = false; // bloom one daisy
    daisyField(); //daisy field
    pop();
  }
  else if (obj.seconds_until_alarm > 0){ // alarm count down
    push();
    twelveDaisies = false; // bloom one daisy
    daisyField(); // daisy field
    pop();
  }
  else { // alarm going off 
   
    push();
    twelveDaisies = true; // bloom twelve daisies
    daisyField(); // daisy field
    pop();
  }

  //bee
  push();
  rotate(buzzing); // rotating bee circle motion
  bee(); // bee with spinning motion
  pop();

  // padding
  translate(-width/2, -height/2); // translate (0, 0) to top left of canvas
  push();
  noStroke(); // no stroke weight
  fill(255); // white colour
  rect(0, 0, height/2, height); // left rectangle
  rect((width+height)/2, 0, height/2, height); // right rectangle
  pop();

}

// field of grass function
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
    [-30, -150],
    [140, -190],
    [50, -90],
    [50, 140],
    [180, 60],
    [-160, 20],
    [-150, 180],
    [90, 190],
    [-200, -220],
    [-90, -210],
    [-50, 40],
    [-210, 100],
    [20, -190],
    [100, -130],
    [80, 20],
    [140, -10],
    [-80, 140],
    [-30, 80],
    [-10, 130],
    [200, -210],
    [-200, -90],
    [-210, 210],
    [150, 110],
    [60, 60],
    [80, -230],
    [220, 10],
    [210, 140],
  ]

  for (let i = 0; i < grassArray.length; i++) {
    let x = grassArray[i][0]; // x coordinate
    let y = grassArray[i][1]; // y coordinate

    push();
    translate(x, y);
    noStroke();
    beginShape();
    vertex(sway, 0);
    bezierVertex(13+sway*0.75, 6, 18+sway*0.75, 8, 20, 45);
    vertex(18, 40)
    bezierVertex(10+sway*0.75, 5, 15+sway*0.75, 10, sway, 0);
    endShape();
    pop();
  }
}

// sunflower function
function sunflower() {

  noStroke(); // no stroke

  push();
  rotate(180); // reflect horizontally
  // colorMode(HSB, 360, 100, 100, 100);

  // sunflower leaves
  push();

  // left leaf (when 0:00)
  rotate(130);
  fill(27, 99, 46);
  beginShape();
  vertex(0, 0);
  bezierVertex(-40, -20, -30, -90, 0, -120);
  bezierVertex(15, -90, 20, -20, 0, 0);
  endShape();
  strokeWeight(2);
  stroke(16, 69, 30);
  line(0, 0, -2, -102);
  line(-2, -90, -5, -95);
  line(-1, -90, 2, -95);
  line(-1, -75, 5, -85);
  line(-1, -55, 7, -70);

  // right leaf (when 0:00)
  noStroke();
  rotate(100);
  beginShape();
  vertex(0, 0);
  bezierVertex(40, -20, 30, -90, 0, -120);
  bezierVertex(-15, -90, -20, -20, 0, 0);
  endShape();
  strokeWeight(2);
  stroke(16, 69, 30);
  line(0, 0, 2, -102);
  line(2, -90, 5, -95);
  line(1, -90, -2, -95);
  line(1, -75, -5, -85);
  line(1, -55, -7, -70);
  pop();

  // disc floret
  fill(77, 44, 11); // brown colour 
  ellipse(0, 0, 80, 50); // disk floret

  //sunflower
  // var gradient = this.drawingContext.createLinearGradient(
  //   0, 0, 100, 100
  // );
  // gradient.addColorStop(0, color(232, 192, 14));
  // gradient.addColorStop(1, color(232, 163, 14));
  // this.drawingContext.fillStyle = gradient;

  fill(232, 192, 14); // yellow colour

  // 12 o'clock petal (when 0:00)
  push();
  rotate(180);
  bezier(-5.5, -22, -35, -105, 35, -105, 5.5, -22);
  pop();

  // 1 o'clock petal (when 0:00)
  push();
  rotate(210);
  bezier(-2.5, -22, -35, -110, 35, -110, 8.5, -24);
  pop();

  // 2 o'clock petal (when 0:00)
  push();
  rotate(240);
  bezier(-1.5, -28, -35, -125, 35, -125, 9.5, -32);
  pop();

  // 3 o'clock petal (when 0:00)
  push();
  rotate(270);
  bezier(-5, -35, -45, -145, 45, -145, 5, -35);
  pop();

  // 4 o'clock petal (when 0:00)
  push();
  rotate(300);
  bezier(-9, -32, -45, -138, 45, -138, 1, -28);
  pop();

  // 5 o'clock petal (when 0:00)
  push();
  rotate(330);
  bezier(-8, -24, -45, -133, 45, -133, 2, -22);
  pop();

  // 6 o'clock petal (when 0:00)
  push();
  bezier(-5, -21, -45, -130, 45, -130, 5, -21);
  pop();

  // 7 o'clock petal (when 0:00)
  push();
  rotate(30);
  bezier(-2, -22, -45, -133, 45, -133, 8, -24);
  pop();

  // 8 o'clock petal (when 0:00)
  push();
  rotate(60);
  bezier(-1, -28, -45, -138, 45, -138, 9, -32);
  pop();

  // 9 o'clock petal (when 0:00)
  push();
  rotate(90);
  bezier(-5, -35, -45, -145, 45, -145, 5, -35);
  pop();

  // 10 o'clock petal (when 0:00)
  push();
  rotate(120);
  bezier(-9.5, -32, -35, -125, 35, -125, 1.5, -28);
  pop();

  // 11 o'clock petal (when 0:00)
  push();
  rotate(150);
  bezier(-8.5, -24, -35, -110, 35, -110, 2.5, -22);
  pop();

  pop();
}

// sunflower shadow function
function shadow() {
  let growShadow;

  if(obj.hours >= 6 && obj.hours <= 12 ){

    growShadow = map(obj.hours, 6, 12, 0, -18)
  }
  else if( obj.hours > 12 && obj.hours <= 18 ){
    growShadow = map(obj.hours, 13,18, -18,0);
  }
  else {
    growShadow = 0;
  }

  //console.log(growShadow);

  push();
  rotate(180);
  noStroke(); // no outline

  fill(30, 64, 29, 0.75); // dark green colour
  ellipse(0, 0, 80, 50); // disk floret

  // 12 o'clock petal (when 0:00)
  push();
  rotate(180);
  bezier(-5.5, -22, -35, -105 + growShadow, 35, -105 + growShadow, 5.5, -22);
  pop();

  // 1 o'clock petal (when 0:00)
  push();
  rotate(210);
  bezier(-2.5, -22, -35, -110 + growShadow, 35, -110 + growShadow, 8.5, -24);
  pop();

  // 2 o'clock petal (when 0:00)
  push();
  rotate(240);
  bezier(-1.5, -28, -35, -125 + growShadow, 35, -125 + growShadow, 9.5, -32);
  pop();

  // 3 o'clock petal (when 0:00)
  push();
  rotate(270);
  bezier(-5, -35, -45, -145 + growShadow, 45, -145 + growShadow, 5, -35);
  pop();

  // 4 o'clock petal (when 0:00)
  push();
  rotate(300);
  bezier(-9, -32, -45, -138 + growShadow, 45, -138 + growShadow, 1, -28);
  pop();

  // 5 o'clock petal (when 0:00)
  push();
  rotate(330);
  bezier(-8, -24, -45, -133 + growShadow, 45, -133 + growShadow, 2, -22);
  pop();

  // 6 o'clock petal (when 0:00)
  push();
  bezier(-5, -21, -45, -130 + growShadow, 45, -130 + growShadow, 5, -21);
  pop();

  // 7 o'clock petal (when 0:00)
  push();
  rotate(30);
  bezier(-2, -22, -45, -133 + growShadow, 45, -133 + growShadow, 8, -24);
  pop();

  // 8 o'clock petal (when 0:00)
  push();
  rotate(60);
  bezier(-1, -28, -45, -138 + growShadow, 45, -138 + growShadow, 9, -32);
  pop();

  // 9 o'clock petal (when 0:00)
  push();
  rotate(90);
  bezier(-5, -35, -45, -145 + growShadow, 45, -145 + growShadow, 5, -35);
  pop();

  // 10 o'clock petal (when 0:00)
  push();
  rotate(120);
  bezier(-9.5, -32, -35, -125 + growShadow, 35, -125 + growShadow, 1.5, -28);
  pop();

  // 11 o'clock petal (when 0:00)
  push();
  rotate(150);
  bezier(-8.5, -24, -35, -110 + growShadow, 35, -110 + growShadow, 2.5, -22);
  pop();

  pop();
}

//sun function
function sun(){
  colorMode(RGB, 255) // rgb colour mode
  noStroke(); // no stroke
  fill(255, 238, 128, 8); // transparent yellow colour
  for(i = 0; i < 100; i++){
    ellipse(0, -325, i*3); // feathered circle
  }
}

//bee function
function bee(){
  colorMode(RGB, 255, 255, 255, 1); // rbg colour mode
  noStroke(); // no stroke

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

// single daisy function
function drawDaisy(x, y, isBloomed = false) {
  
  push();
  translate(x, y); // daisy centre at (x, y)
  noStroke(); // no stroke

  // daisy petals
  fill(255); // white coloured petals
  let petalLength = -10; // length of unbloomed daisy petal

  if(isBloomed === true) {
    petalLength -= frameCount * 0.1; // bloom daisy petal rate
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
  
  // disc floret
  fill(250, 234, 95); // yellow colour
  circle(0, 0, 10); // disc floret shape
  pop();
}

// field of daisies function
function daisyField(){
  if(twelveDaisies == true){
    for (let i = 0; i < daisyArray.length; i++) {
      let x = daisyArray[i][0]; // x coordinate
      let y = daisyArray[i][1]; // y coordinate

      drawDaisy(x, y, true);
      }
  } else {
    if (obj.minutes >= 0 && obj.minutes < 5){
      drawDaisy(daisyArray[0][0], daisyArray[0][1], true);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 5 - 9 minutes
    else if (obj.minutes >= 5 && obj.minutes < 10){
      //bloomed daisy
      drawDaisy(daisyArray[1][0], daisyArray[1][1], true);
      //unbloomed daises
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    } 
    // 10 - 14 minutes
    else if (obj.minutes >= 10 && obj.minutes < 15){
      // bloomed daisy
      drawDaisy(daisyArray[2][0], daisyArray[2][1], true);
      // unbloomed daisies
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 15 - 19 minutes
    else if (obj.minutes >= 15 && obj.minutes < 20){
      // bloomed daisy
      drawDaisy(daisyArray[3][0], daisyArray[3][1], true);
      // unbloomed daisies
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 20 - 24 minutes
    else if (obj.minutes >= 20 && obj.minutes < 25){
      // bloomed daisy
      drawDaisy(daisyArray[4][0], daisyArray[4][1], true);
      //unbloomed daisy
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 25 - 29 minutes
    else if (obj.minutes >= 25 && obj.minutes < 30){
      // unbloomed daisy
      drawDaisy(daisyArray[5][0], daisyArray[5][1], true);
      // bloomed daisy
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 30 - 34 minutes
    else if (obj.minutes >= 30 && obj.minutes < 35){
      // bloomed daisy
      drawDaisy(daisyArray[6][0], daisyArray[6][1], true);
      // unbloomed daises
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 35 - 39 minutes
    else if (obj.minutes >= 35 && obj.minutes < 40){
      // bloomed daisy
      drawDaisy(daisyArray[7][0], daisyArray[7][1], true);
      // unbloomed daisies
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 40 - 44 minutes
    else if (obj.minutes >= 40 && obj.minutes < 45){
      // bloomed daisy
      drawDaisy(daisyArray[8][0], daisyArray[8][1], true);
      // unbloomed daisies
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 45 - 49 minutes
    else if (obj.minutes >= 45 && obj.minutes < 50){
      // bloomed daisy
      drawDaisy(daisyArray[9][0], daisyArray[9][1], true);
      // unbloomed daisies
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    }
    // 50 - 54 minutes
    else if (obj.minutes >= 50 && obj.minutes < 55){
      // bloomed daisy
      drawDaisy(daisyArray[10][0], daisyArray[10][1], true);
      // unbloomed daisies
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[11][0], daisyArray[11][1]);
    } 
    // 55 - 59 minutes
    else if (obj.minutes >= 55 && obj.minutes <= 59){
      // bloomed daisy
      drawDaisy(daisyArray[11][0], daisyArray[11][1], true);
      // unbloomed daisies
      drawDaisy(daisyArray[0][0], daisyArray[0][1]);
      drawDaisy(daisyArray[1][0], daisyArray[1][1]);
      drawDaisy(daisyArray[2][0], daisyArray[2][1]);
      drawDaisy(daisyArray[3][0], daisyArray[3][1]);
      drawDaisy(daisyArray[4][0], daisyArray[4][1]);
      drawDaisy(daisyArray[5][0], daisyArray[5][1]);
      drawDaisy(daisyArray[6][0], daisyArray[6][1]);
      drawDaisy(daisyArray[7][0], daisyArray[7][1]);
      drawDaisy(daisyArray[8][0], daisyArray[8][1]);
      drawDaisy(daisyArray[9][0], daisyArray[9][1]);
      drawDaisy(daisyArray[10][0], daisyArray[10][1]);
    }
  }
}