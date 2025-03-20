[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/M3ipj5sV)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=18378505&assignment_repo_type=AssignmentRepo)
## MDDN 242 Project 1: Time-based Media 

## Sun(flower) Dial - Hayley Chung 

Sun(flower) Dial visually depicts the concept of time through how sunflowers, daisies, and bees in nature respond to the time throughout the day. This method of telling time was inspired by Kircher's sunflower clock and Linnaeus's flower clock. The heliotropic nature of the sunflower rotates to follow the sun and displays the hour, and the size of the shadow changes to reflect the time of day. The location of the singular bloomed daisy indicates the minutes in five-minute intervals, when the alarm is set all twelve daisies begin to shake until the alarm goes off and all twelve daisies are in full bloom. The bee flies around in a circle representing the seconds.

### Part 1: [Sketch](https://25-mddn242.github.io/time-based-media-hayley-c/part1.html)

The initial sketch of my original clock was inspired by [Kircher's sunflower clock](https://agosto-foundation.org/athanasius-kircher-sunflower-clock), which uses the heliotropic nature of a sunflower to indicate the time as the flower rotates to face the sun, and [Linnaeus's flower clock](https://en.wikipedia.org/wiki/Linnaeus%27s_flower_clock), where different species of flowers would open and close at particular times of the day to indicate the time. Although both of these clocks are not realistic methods of telling time, I found the idea of using the behaviour of flowers an intriguing way of visually representing the concept of time. 

Kircher's sunflower clock:

<img src = "https://d28fxxt57nf3uz.cloudfront.net/uploads/content_picture/2183/FR_Trove_sunflower-clock_kircher_225px.jpg" alt = "Kircher's sunflower clock" width = 300>

Linnaeus's flower clock:

<img src = "https://static01.nyt.com/images/2015/01/29/garden/29GARDEN1/29GARDEN1-superJumbo.jpg" alt = "Linnaeus's flower clock" width = 300>

### Part 2: [Maeda Clock](https://25-mddn242.github.io/time-based-media-hayley-c/part2.html)

The Maeda clock I have recreated is [clock 7](https://codingtrain.github.io/12oclocks/#clock-07), the vertical digital clock that emulates the seconds hand of an analogue clock to indicate the number of seconds that have passed. I chose to recreate this clock as I feel the rotation of the digital clock is similar to the rotation of the central flower in my original clock, therefore helping to refresh and practice JavaScript skills. A small change I made was using circles rather than squares to create the font of the numbers. 

### Part 3: Original Clock
#### Process
My process began with creating the visual of a flower inside a ring, inspired by Kircher’s sunflower clock while getting used to P5js again. However, because of the 3D perspective I was not sure how to rotate a sunflower. 

I explored the possibility of a clock with a blooming water lily and koi fish in a pond. 
Although this was easier to create with code, I was attached to the idea of a heliotropic sunflower following the sun.

<img src = "/assets/waterLily.jpg" alt = "Exploration of a water lily clock" width = 600>

Rather showing a front view of the sunflower, an aerial perspective would better suit the code medium. To create the illusion of the sunflower following the sun’s motion to show the hour, I used the shape of the petal to make the flower appear slightly tilted, added a glowing sun, and a shadow. 

The code for the glowing sun is from the sketch [illumination-glow by jesse_harding](https://editor.p5js.org/jesse_harding/sketches/WpONQ8o6u). I adjusted the colour and size to better suit my clock. 

```
function sun(){
  colorMode(RGB, 255) // rgb colour mode
  noStroke(); // no stroke
  fill(255, 238, 128, 8); // transparent yellow colour
  for(i = 0; i < 100; i++){
    ellipse(0, -325, i * 3); // feathered circle
  }
}
```

To make the alarm more impactful, I increased the size of the sun when the alarm goes off.

To more accurately represent how the sunflower's shadow changes over the course of the day, I added maps within if statements to lengthen the shadow between 6:00 and 12:00, then shhorten it between 12:00 and 18:00. I explored making the lengthening effect more dramatic, however this altered the ratio between the petal shadows' length and width. So, in addition to lengthening the shadows, I also scaled them up and down slightly which didn't impact the ratio too much.

For the seconds, I added a bee which flies around in a circle showing the clock’s seconds. I have used random number to create a buzzing effect. For the bee’s motion I had initially mapped obj.seconds, but later created a map with exact seconds to create a smoother more natural motion for the bee. 

To determine the location of the 12 daisies, I had tried to use a for loop. However, because I was often translating (0, 0) and rotating around it, the coordinate system was mixed up. So, I used trigonometry to find the co ordinates and added them into an array to place the daisies individually.

For the daisy shapes, I used a for loop the petals. However, when animating the petals for a blooming effect, the for loop would continue to draw resulting in a bug where one petal would continue to grow.

<img src = "/assets/petalBug.jpg" alt = "Bloominng petal length bug" width = 600>

Adding an if statement and condition to only increase the petal’s length when it was not fully bloomed fixed this bug. 

I initially had the code for the daisy field separated into many different functions, including a single daisy with bloomed and closed versions and a field of daisies with clock and alarm versions. This was helpful in determining how I wanted the clock to function, however I was later able to simplify the code into two functions. But to make the code more compact, I used if statements, flag conditions, and set defaults for these flag conditions to use to same function for a bloomed or unbloomed daisy, and one bloomed daisy or 12 bloomed daisies. 

When setting the alarm the daises begin to shake, indicating that the alarm will go off soon. For this code, I referenced [Move in a Circle by kchung](https://editor.p5js.org/kchung/sketches/SJkdHhWUQ).

```
var shakeAngle = 0;	// initialize daisies' shake angle
var daisyShakeRadius = .5;  // radius of daisies' shake

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
```

A design choice I have made is to include padding on the right and left sides of the canvas to create a square frame around the clock. Because of the smaller scale of the clock’s elements, the tighter framing reduces the empty space thus highlighting the clock itself. The padding was white to begin with but I later changed it to a light yello shade to make the clock more cohesive
<img src = "/assets/withoutPadding.png" alt = "Clock without padding" width = 600>
<img src = "/assets/withPadding.png" alt = "Clock with padding" width = 600>
<img src = "/assets/yellowPadding.png" alt = "Clock with padding" width = 600>

The addition of a grass field swaying in the wind, furthers the peaceful atmosphere of the clock and adds more dimension and movement to the scene. The code to create the swaying motion is adapted from [sr5516’s 11.16, module 4, simple harmonic motion - pendulum motion square sketch](https://editor.p5js.org/sr5516/sketches/F2MIdyRmk). I adjusted the variables and applied the motion to just the top of the bezier curves that form the blades of grass. To populate the background with grass I utilized arrays, first for each individual blade then for layers of grass fields.

<img src = "/assets/withoutField.png" alt = "Clock without grass field" width = 600>
<img src = "/assets/withField.png" alt = "Clock with grass field" width = 600>

```
var swayPeriod = 0.0; // define grass swaying period
var sway = 0.0; // define sway motion
var swayMotion = 0.0; // define sway period

var amplitude = 8; // swaying distance
var swayPeriod = frameCount / 8 * TWO_PI; // period of sway
sway = cos(swayPeriod) * amplitude; // sway motion
```

Outside the scope of this project, I would explore using changing colours and shades to reflect day and night. I would also work on blooming and unblooming the diasies when the minutes change to create a smoother transition.

### Part 4: Clock Alarm
<img src = "/preview.jpg" alt = "Sun(flower) Dial when alarm goes off">

### Part 5: [Final Clock](https://25-mddn242.github.io/time-based-media-hayley-c/) 
#### Sun(flower) Dial
<img src = "/assets/sun(flower)DialClock.png" alt = "Sun(flower) Dial main view">
