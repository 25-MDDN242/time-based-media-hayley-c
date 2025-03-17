[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/M3ipj5sV)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=18378505&assignment_repo_type=AssignmentRepo)
## MDDN 242 Project 1: Time-based Media  

### THIS IS YOUR README

Update this file as you go along to record your progress.

### Part 1: Sketch 

The initial sketch of my original clock was inspired by Kircher’s sunflower clock, which uses the heliotropic nature of a sunflower to indicate the time as the flower rotates to face the sun, and Linnaeus’s flower clock, where different species of flowers would open and close at particular times of the day to indicate the time. Although both of these clocks are not realistic methods of telling time, I found the idea of using the behaviour of flowers an intriguing way of visually representing the concept of time. 

Kircher's sunflower clock:
![Kircher's sunflower clock.](hhttps://lh3.googleusercontent.com/ci/AL18g_QznFLNR3n9UifsS-qkIIHk0SNP-IRVS-YcdGltLqC7YJD1I_iR-fdB62_q_ywOJoY6SOBgOP8)

Linnaeus's flower clock:
![Linnaeus's flower clock.](https://static01.nyt.com/images/2015/01/29/garden/29GARDEN1/29GARDEN1-superJumbo.jpg)

### Part 2: Maeda Clock 

The Maeda clock I have recreates is the vertical digital clock that emulates the seconds hand of an analogue clock to indicate the number of seconds that have passed. I chose to recreate this clock as I feel the rotation of the digital clock is similar to the rotation of the central flower in my original clock, therefore helping to refresh and practice JavaScript skills. A small change I made was using circles rather than squares to create the font of the numbers. 

### Part 3: Original Clock 


#### Flower Type
I intitially started by trying to create the centre sunflower in code. However, I quickly realised the difficulty of rotating a sunflower in 2D, so I decided to change my idea slightly. Rather than a sunflower, I chose to create a water lily in a pond. The water lily petals blooms to show the seconds, and the lilypad shows the minutes. I am also currently working on a koi fish to swim around the pond to show the seconds. I haven't yet decided how I want to display the hours or what the alarm function will look like.
![Screenshot of the bee asset function](/assets/waterLily.png)

#### Orbiting Flower
To create the effect of the flower bobbing in a circle I referenced [Move in a Circle by kchung](https://editor.p5js.org/kchung/sketches/SJkdHhWUQ)

#### Re: Flower Type
Although the lotus flower is easier to contruct and implement a spinning motion, I still found myself attached to the idea of a sunflower and its heliotropic nature. After considering how I would be able to achieve the appearance I wanted to explore using a aerial perspective of the sunflower rather than a front view. I think this idea may work if I also include a orbiting sun and a shadow.

From the water lily idea, I still want to incorporate the motion of the koi fish to show the seconds, so I will chnage this to a bee for the sunflower clock.

I am still unsure of how I will show minutes or what the alarm function will look like.

#### Sunflower - Part 1
This is how my sunflower currently looks with the shadow added behind it. I think its shape and perspective is slightly off, however I am going to move onto creating the basics and functionality code of the other aspects of the clock first. I also want to add a gradient effect to the petals later, so that the flower has more dimension to it, and maybe also leaves.
![Screenshot of the first sunflower iteration](/assets/sunflowerPart1.png)

#### Buzzy Bee
Using the code I had previously intended to use for the koi fish, I used it to create a bee moving around the sunflower. I initially used obj.seconds to make the bee fly around the flower. However to make this motion smoother, I later changed it to use exact seconds which made the bee's motion more natural.
![Screenshot of the bee asset function](/assets/bee.png)

#### Sun Part 1
I added a basic circle shape as the sun that orbits around the sunflower. I later want to add a gradient effect on this too as the sun's edge is quite harsh, but I think the clock will look better if it appears as a soft glow.
![Screenshot of sun that orbits around the sunflower](/assets/sunPart1.jpg)

#### Padding
Because of the design of the clock, with the sunflower at the centre and the sun and bee orbiting around it, I found the shape of the canvas wasn't necessarily the most fitting for this context. Rather than editing the size of the canvas, I have chosen to add white rectangles to pad out the sides of the canvas. 
![Screenshot of clock without padding](/assets/sunPart1.png)
![Screenshot of clock with padding](/assets/padding.png)

#### Daisy Field
The a single bloomed daisy represents the current minutes, while a full field of 12 bloomed daisies appear when the alarm goes off. 

I tried to create the field of daisies using a for loop, however because I have rotated any translated many different elements this resulted in the daisy field being uncentred when using a for loop. So, I used trigonometry to find the co ordinates and added them into an array to place the daisies iondividually.

The blooming motion resulted in a bug where one petal would keep growing, as the for loop to draw the petals kept being drawn. 
![Screenshot of daisy's petal length bug](/assets/brokenSingleBloom.png)

I resolved this by adding an if statement to only grow the petal length when it was less than a specific length.

Initially I had two separate functions for a bloomed and unbloomed daisy. However, by having the default being an unbloomed daisy then if the daisy needs to be bloomed, the petal length increases.

I also initially had separate functions for the daisy field when the alarm was set and when it was going off. However by using an if statement and condition I was able to combine them into one function, and use the condition when calling thet function for the obj.seconds_until_alarm was less than 0.

![Screenshot of an unbloomed daisy field](/assets/unbloomed.png)
![Screenshot of a bloomed daisy field](/assets/bloomed.png)

#### Grass field
To add to the atmospheric feeling of the clock, I experimented with adding grass that would sway in the wind.

For the swaying motion I initally tried to follow pendulum tutorials, however these either included dampening effects or required adding code to the set up function. Eventually I found
a tutorial by [sr5516 for 11.16, module 4, simple harmonic motion - pendulum motion square](https://editor.p5js.org/sr5516/sketches/F2MIdyRmk). I added this movement to the top of the blade of grass so that it would have a slight swaying effect.

![Screenshot of initial grass field](/assets/initialGrass.png)

After creating the motion, I then altered the shape of the grass and using an array placing more blades of grass into the clock. To add different coloured grass, I repeatedly called the function changing the fill colour and translating it each time. 

![Screenshot of initial grass field](/assets/grassField.png)

#### Glowing Sun
To make create a glowing effect for the sun, I referenced
[illumination-glow by jesse_harding](https://editor.p5js.org/jesse_harding/sketches/WpONQ8o6u). I then adjusted the colour and size of the circle to fit better within my clock.
![Screenshot of the glowing sun](/assets/glowingSun.png)

### Part 4: Clock Alarm
For the alarm function
![Screenshot of the alarm](/assets/daisyAlarm.png)

### Part 5: Final Clock 