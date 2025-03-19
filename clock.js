/*
 * use p5.js to draw a clock on a 960x500 canvas
 */

var daisyArray = []; // define daisy array
var swayPeriod = 0.0; // define grass swaying period
var sway = 0.0; // define sway motion

var shakeAngle = 0;	// initialize daisies' shake angle
var daisyShakeRadius = .5;  // radius of daisies' shake

function populate_daisyArray() {
  const daisyFieldRadius = 180; // radius of daisy field
  const daisySin30 = daisyFieldRadius * sin(30); // daisy field radius * sin(30)
  const daisyCos30 = daisyFieldRadius * cos(30); // daisy field radius * cos(30)

 daisyArray = [
  [0, -daisyFieldRadius], // 0 - 4 minutes
  [daisySin30, -daisyCos30], // 5 - 9 minutes
  [daisyCos30, -daisySin30], // 10 - 14 minutes
  [daisyFieldRadius, 0], // 15 - 19 minutes
  [daisyCos30, daisySin30], // 20 - 24 minutes
  [daisySin30, daisyCos30], // 25 - 29 minutes
  [0,daisyFieldRadius], // 30 - 34 minutes
  [-daisySin30, daisyCos30], // 35 - 39 minutes
  [-daisyCos30,daisySin30], // 40 - 44 minutes
  [-daisyFieldRadius, 0], // 45 - 49 minutes
  [-daisyCos30, -daisySin30], // 50 - 54 minutes
  [-daisySin30, -daisyCos30], // 55 - 59 minutes
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

  populate_daisyArray(); // populate daisy location array

  // creating exactSeconds
  let secs = obj.seconds;
  let millis = obj.millis;
  let exactSeconds = secs + millis / 1000.0;

  //maps
  let beeCircle = map(exactSeconds, 0, 59, 0, 359); // seconds map for bee moving in a circle
  let heliotropic = map(obj.hours, 0, 24 / 2, 0, 359); // hours map for heliotropic sunflower

  // multicoloured grass field
  grassMulticoloured();

  // centre sunflower
  push();
  rotate(heliotropic); // heliotropic motion

  push();
  translate(0, 45); //offeset shadow
  shadow(); // sunflower shadow
  pop();
  leaves(); // sunflower leaves
  sunflower(); // sunflower
  sun(); // sun
  pop();
 
  if(obj.seconds_until_alarm < 0 || obj.seconds_until_alarm === undefined){ //default clock
    push();
    daisyField(); //daisy field
    pop();
  }
  else if (obj.seconds_until_alarm > 0){ // alarm count down
    push();
    daisyField(); // daisy field
    pop();
  }
  else { // alarm going off 
    push();
    daisyField(true); // daisy field
    pop();
  }

  //bee
  push();
  rotate(beeCircle); // rotating bee circle motion
  bee(); // bee with spinning motion
  pop();

  // padding
  translate(-width / 2, -height / 2); // translate (0, 0) to top left of canvas
  push();
  noStroke(); // no stroke weight
  fill(255); // white colour
  rect(0, 0, height / 2, height); // left rectangle
  rect((width + height) / 2, 0, height / 2, height); // right rectangle
  pop();

}

// field of grass function
function grass(){

  var amplitude = 8; // swaying distance
  var swayPeriod = frameCount / 8 * TWO_PI; // period of sway
  sway = cos(swayPeriod) * amplitude; // sway motion

  // individual blade of grass coordinates
  let grassBladesArray = [
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
    [-210, -90],
    [-210, 210],
    [150, 110],
    [60, 60],
    [80, -230],
    [220, 10],
    [210, 140],
    [-120, 0],
    [-190, -40],
  ];

  for (let i = 0; i < grassBladesArray.length; i++) {
    let x = grassBladesArray[i][0]; // x coordinate
    let y = grassBladesArray[i][1]; // y coordinate

    push();
    translate(x, y); // blade of grass coordinates
    noStroke(); // not stroke
    // blade of grass shape
    beginShape();
    vertex(sway, 0); // top of grass blade sways
    bezierVertex(13 + sway * 0.75, 6, 18 + sway * 0.75, 8, 20, 45); 
    vertex(18, 40)
    bezierVertex(10 + sway * 0.75, 5, 15 + sway * 0.75, 10, sway, 0);
    endShape();
    pop();
  }
}

// multicoloured grass field function
function grassMulticoloured(){

  // shades of green
  const green1 = color(49, 130, 59);
  const green2 = color(31, 130, 58);
  const green3 = color(32, 120, 43);
  const green4 = color(32, 120, 43);

  let fieldArray = [
    [0, -40, green1],
    [-36, -12, green1],
    [6, 16, green2],
    [21, -20, green2],
    [9, 32, green3],
    [-10, 25, green3],
    [-20, 19, green4],
    [3, -4, green4]
  ];

  for (let i = 0; i < fieldArray.length; i++) {
    let fieldX = fieldArray[i][0]; // x coordinate
    let fieldY = fieldArray[i][1]; // y coordinate
    let fieldColour = fieldArray[i][2]; // grass colour
    push();
    fill(fieldColour); // grass colours 
    translate(fieldX, fieldY); // single grass field position
    grass(); // single gras field 
    pop();
  }
}

// sunflower function
function sunflower() {
  noStroke(); // no stroke
  push();

  // disc floret
  fill(77, 44, 11); // brown colour 
  ellipse(0, 0, 80, 50); // disk floret

  //sunflower petals
  fill(232, 192, 14); // yellow colour

  // 12 o'clock petal (when 0:00
  bezier(-5.5, -22, -35, -105, 35, -105, 5.5, -22);

  // 1 o'clock petal (when 0:00)
  rotate(30);
  bezier(-2.5, -22, -35, -110, 35, -110, 8.5, -24);

  // 2 o'clock petal (when 0:00)
  rotate(30);
  bezier(-1.5, -28, -35, -125, 35, -125, 9.5, -32);

  // 3 o'clock petal (when 0:00)
  rotate(30);
  bezier(-5, -35, -45, -145, 45, -145, 5, -35);

  // 4 o'clock petal (when 0:00)
  rotate(30);
  bezier(-9, -32, -45, -138, 45, -138, 1, -28);

  // 5 o'clock petal (when 0:00)
  rotate(30);
  bezier(-8, -24, -45, -133, 45, -133, 2, -22);

  // 6 o'clock petal (when 0:00)
  rotate(30);
  bezier(-5, -21, -45, -130, 45, -130, 5, -21);

  // 7 o'clock petal (when 0:00)
  rotate(30);
  bezier(-2, -22, -45, -133, 45, -133, 8, -24);

  // 8 o'clock petal (when 0:00)
  rotate(30);
  bezier(-1, -28, -45, -138, 45, -138, 9, -32);

  // 9 o'clock petal (when 0:00)
  rotate(30);
  bezier(-5, -35, -45, -145, 45, -145, 5, -35);

  // 10 o'clock petal (when 0:00
  rotate(30);
  bezier(-9.5, -32, -35, -125, 35, -125, 1.5, -28)

  // 11 o'clock petal (when 0:00)
  rotate(30);
  bezier(-8.5, -24, -35, -110, 35, -110, 2.5, -22)

  pop();
}

// sunflower leaves
function leaves(){
  push();

  // left leaf (when 0:00)

  noStroke();
  rotate(130); // leaf position
  fill(27, 99, 46); // green colour
  //leaf shape
  beginShape();
  vertex(0, 0);
  bezierVertex(-40, 20, -30, 90, 0, 120);
  bezierVertex(15, 90, 20, 20, 0, 0);
  endShape();
  // leaf viens 
  strokeWeight(2); // vien size
  stroke(16, 69, 30); // darker green
  line(0, 0, -2, 102); // centre line
  line(-2, 90, -5, 95); // top line
  line(-1, 90, 2, 95); // top line
  line(-1, 75, -7, 85); // middle line
  line(-1, 55, -9, 70); // bottom line

  // right leaf (when 0:00)
  noStroke(); // no stroke
  rotate(100); // leaf position
  //leaf shape
  beginShape();
  vertex(0, 0);
  bezierVertex(40, 20, 30, 90, 0, 120);
  bezierVertex(-15, 90, -20, 20, 0, 0);
  endShape();
  // leaf viens
  strokeWeight(2); // vien size
  stroke(16, 69, 30); // darker green
  line(0, 0, 2, 102); // centre line
  line(2, 90, 5, 95); // top line
  line(1, 90, -2, 95); // top line
  line(1, 75, 7, 85); // middle line
  line(1, 55, 9, 70); // bottom line

  pop();
}

// sunflower shadow function
function shadow() {
  let growShadow;
  // from 6:00 to 12:00 shadow gets longer
  if (obj.hours >= 6 && obj.hours <= 12){ 
    growShadow = map(obj.hours, 6, 12, 0, -20)  
  }
  // from 12:00 to 18:00 shadow gets shorter
  else if ( obj.hours > 12 && obj.hours <= 18 ){
    growShadow = map(obj.hours, 13,18, -20,0);
  }
  // from 18:00 to 6:00 shadow does not change
  else {
    growShadow = 0;
  }

  push();
  noStroke(); // no outline

  fill(30, 64, 29, 0.75); // dark green colour
  ellipse(0, 0, 80, 50); // disk floret

  // 12 o'clock petal (when 0:00)
  bezier(-5.5, -22, -35, -105 + growShadow, 35, -105 + growShadow, 5.5, -22);

  // 1 o'clock petal (when 0:00)
  rotate(30);
  bezier(-2.5, -22, -35, -110 + growShadow, 35, -110 + growShadow, 8.5, -24);

  // 2 o'clock petal (when 0:00)
  rotate(30);
  bezier(-1.5, -28, -35, -125 + growShadow, 35, -125 + growShadow, 9.5, -32);

  // 3 o'clock petal (when 0:00)
  rotate(30);
  bezier(-5, -35, -45, -145 + growShadow * .9, 45, -145 + growShadow * .9, 5, -35);

  // 4 o'clock petal (when 0:00)
  rotate(30);
  bezier(-9, -32, -45, -138 + growShadow * .93, 45, -138 + growShadow  * .93, 1, -28);

  // 5 o'clock petal (when 0:00)
  rotate(30);
  bezier(-8, -24, -45, -133 + growShadow * .96, 45, -133 + growShadow * .96, 2, -22);

  // 6 o'clock petal (when 0:00)
  rotate(30);
  bezier(-5, -21, -45, -130 + growShadow, 45, -130 + growShadow, 5, -21);

  // 7 o'clock petal (when 0:00)
  rotate(30);
  bezier(-2, -22, -45, -133 + growShadow * .96, 45, -133 + growShadow * .96, 8, -24);

  // 8 o'clock petal (when 0:00)
  rotate(30);
  bezier(-1, -28, -45, -138 + growShadow * .93, 45, -138 + growShadow * .93, 9, -32);

  // 9 o'clock petal (when 0:00)
  rotate(30);
  bezier(-5, -35, -45, -145 + growShadow * .9, 45, -145 + growShadow * .9, 5, -35);

  // 10 o'clock petal (when 0:00)
  rotate(30);
  bezier(-9.5, -32, -35, -125 + growShadow, 35, -125 + growShadow, 1.5, -28);

  // 11 o'clock petal (when 0:00)
  rotate(30);
  bezier(-8.5, -24, -35, -110 + growShadow, 35, -110 + growShadow, 2.5, -22);

  pop();
}

//sun function
function sun(){
  colorMode(RGB, 255) // rgb colour mode
  noStroke(); // no stroke
  fill(255, 238, 128, 8); // transparent yellow colour
  for(i = 0; i < 100; i++){
    ellipse(0, -325, i * 3); // feathered circle
  }
}

//bee function
function bee(){
  colorMode(RGB, 255, 255, 255, 1); // rbg colour mode
  noStroke(); // no stroke

  // bee's stinger
  fill(0); // black colour
  triangle(-5, -155 + random(-1, 1), -14, -150 + random(-1, 1), -5, -145 + random(-0.5, 0.5)); // moving bee stinger

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
// default is an unbloomed daisy
function daisyShape(x, y, isBloomed = false) { 
  push();
  let shakeX; // define daises X axis shake
  let shakeY; // define daises X axis shake
  
  if (obj.seconds_until_alarm > 0){
    shakeX = daisyShakeRadius * cos(shakeAngle)
    shakeY = daisyShakeRadius * sin(shakeAngle);
    shakeAngle += 2.5;
  } 
  else {
    shakeX = 0;
    shakeY = 0;
  }
  translate(x + shakeX, y + shakeY); // daisy centre at (x, y)
  noStroke(); // no stroke

  // daisy petals
  fill(255); // white coloured petals
  let petalLength = -10; // length of unbloomed daisy petal

  // override default to bloom daisy 
  if (isBloomed === true){
    petalLength -= frameCount * 0.1; // bloom daisy petal rate
  }

  for (let i = 0; i <= 12; i++){ // draw a daisy with 12 petals
    rotate(30);

    if(petalLength >= -25){ 
      bezier(0, -2, -9, petalLength, 9, petalLength, 0, -2); // daisy petal shape
    }

    if (isBloomed === true) {
      if (petalLength < -25) { // sets limit on petal's length
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
// default is only one bloomed daisy in field
function daisyField(twelveDaisies = false){
  // bloom 12 daisies in field for alarm
  if (twelveDaisies == true){
    for (let i = 0; i < daisyArray.length; i++) {
      let x = daisyArray[i][0]; // x coordinate
      let y = daisyArray[i][1]; // y coordinate

      daisyShape(x, y, true); // draw daisy at x, y
    }
  // bloom only one daisy in field
  } else {
    // 0 - 4 minutes
    if (obj.minutes >= 0 && obj.minutes < 5){
      // bloomed daisy
      daisyShape(daisyArray[0][0], daisyArray[0][1], true);
      // unbloomed daisies
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 5 - 9 minutes
    else if (obj.minutes >= 5 && obj.minutes < 10){
      //bloomed daisy
      daisyShape(daisyArray[1][0], daisyArray[1][1], true);
      //unbloomed daisies
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    } 
    // 10 - 14 minutes
    else if (obj.minutes >= 10 && obj.minutes < 15){
      // bloomed daisy
      daisyShape(daisyArray[2][0], daisyArray[2][1], true);
      // unbloomed daisies
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 15 - 19 minutes
    else if (obj.minutes >= 15 && obj.minutes < 20){
      // bloomed daisy
      daisyShape(daisyArray[3][0], daisyArray[3][1], true);
      // unbloomed daisies
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 20 - 24 minutes
    else if (obj.minutes >= 20 && obj.minutes < 25){
      // bloomed daisy
      daisyShape(daisyArray[4][0], daisyArray[4][1], true);
      //unbloomed daisy
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 25 - 29 minutes
    else if (obj.minutes >= 25 && obj.minutes < 30){
      // unbloomed daisy
      daisyShape(daisyArray[5][0], daisyArray[5][1], true);
      // bloomed daisy
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 30 - 34 minutes
    else if (obj.minutes >= 30 && obj.minutes < 35){
      // bloomed daisy
      daisyShape(daisyArray[6][0], daisyArray[6][1], true);
      // unbloomed daises
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 35 - 39 minutes
    else if (obj.minutes >= 35 && obj.minutes < 40){
      // bloomed daisy
      daisyShape(daisyArray[7][0], daisyArray[7][1], true);
      // unbloomed daisies
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 40 - 44 minutes
    else if (obj.minutes >= 40 && obj.minutes < 45){
      // bloomed daisy
      daisyShape(daisyArray[8][0], daisyArray[8][1], true);
      // unbloomed daisies
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 45 - 49 minutes
    else if (obj.minutes >= 45 && obj.minutes < 50){
      // bloomed daisy
      daisyShape(daisyArray[9][0], daisyArray[9][1], true);
      // unbloomed daisies
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    }
    // 50 - 54 minutes
    else if (obj.minutes >= 50 && obj.minutes < 55){
      // bloomed daisy
      daisyShape(daisyArray[10][0], daisyArray[10][1], true);
      // unbloomed daisies
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[11][0], daisyArray[11][1]);
    } 
    // 55 - 59 minutes
    else if (obj.minutes >= 55 && obj.minutes <= 59){
      // bloomed daisy
      daisyShape(daisyArray[11][0], daisyArray[11][1], true);
      // unbloomed daisies
      daisyShape(daisyArray[0][0], daisyArray[0][1]);
      daisyShape(daisyArray[1][0], daisyArray[1][1]);
      daisyShape(daisyArray[2][0], daisyArray[2][1]);
      daisyShape(daisyArray[3][0], daisyArray[3][1]);
      daisyShape(daisyArray[4][0], daisyArray[4][1]);
      daisyShape(daisyArray[5][0], daisyArray[5][1]);
      daisyShape(daisyArray[6][0], daisyArray[6][1]);
      daisyShape(daisyArray[7][0], daisyArray[7][1]);
      daisyShape(daisyArray[8][0], daisyArray[8][1]);
      daisyShape(daisyArray[9][0], daisyArray[9][1]);
      daisyShape(daisyArray[10][0], daisyArray[10][1]);
    }
  }
}