[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/M3ipj5sV)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=18378505&assignment_repo_type=AssignmentRepo)
## MDDN 242 Project 1: Time-based Media  

### THIS IS YOUR README

Update this file as you go along to record your progress.

### Part 1: Sketch 

The initial sketch of my original clock was inspired by Kircher’s sunflower clock, which uses the heliotropic nature of a sunflower to indicate the time as the flower rotates to face the sun, and Linnaeus’s flower clock, where different species of flowers would open and close at particular times of the day to indicate the time. Although both of these clocks are not realistic methods of telling time, I found the idea of using the behaviour of flowers an intriguing way of visually representing the concept of time. 

Kircher's sunflower clock:
![Kircher's sunflower clock.](https://lh3.googleusercontent.com/ci/AL18g_R0ehquoKDgFWay6DCSqpdE44Qiy1jwG7ZRqv2_z33NuanKep_24mv4b0gPVqRe2H4q_9SspQ=s1200)

Linnaeus's flower clock:
![Linnaeus's flower clock.](https://static01.nyt.com/images/2015/01/29/garden/29GARDEN1/29GARDEN1-superJumbo.jpg)

### Part 2: Maeda Clock 

The Maeda clock I have recreates is the vertical digital clock that emulates the seconds hand of an analogue clock to indicate the number of seconds that have passed. I chose to recreate this clock as I feel the rotation of the digital clock is similar to the rotation of the central flower in my original clock, therefore helping to refresh and practice JavaScript skills. A small change I made was using circles rather than squares to create the font of the numbers. 

### Part 2: Original Clock 


#### Flower Type
I intitially started by trying to create the centre sunflower in code. However, I quickly realised the difficulty of rotating a sunflower in 2D, so I decided to change my idea slightly. Rather than a sunflower, I chose to create a water lily in a pond. The water lily petals blooms to show the seconds, and the lilypad shows the minutes. I am also currently working on a koi fish to swim around the pond to show the seconds. I haven't yet decided how I want to display the hours or what the alarm function will look like.

#### Orbiting Flower
To create the effect of the flower bobbing in a circle I referenced Move in a Circle by kchung [Move in a Circle example sketch](https://editor.p5js.org/kchung/sketches/SJkdHhWUQ)

#### Re: Flower Type
Although the lotus flower is easier to contruct and implement a spinning motion, I still found myself attached to the idea of a sunflower and its heliotropic nature. After considering how I would be able to achieve the appearance I wanted to explore using a aerial perspective of the sunflower rather than a front view. I think this idea may work if I also include a orbiting sun and a shadow.

From the water lily idea, I still want to incorporate the motion of the koi fish to show the seconds, so I will chnage this to a bee for the sunflower clock.

I am still unsure of how I will show minutes or what the alarm function will look like.

#### Sunflower - Part 1
This is how my sunflower currently looks with the shadow added behind it. I think its shape and perspective is slightly off, however I am going to move onto creating the basics and functionality code of the other aspects of the clock first. I also want to add a gradient effect to the petals later, so that the flower has more dimension to it, and maybe also leaves.

#### Buzzy Bee
Using the code I had previously intended to use for the koi fish, I used it to create a bee moving around the sunflower. I might later experiment with adding a trail behind the bee.

#### Sun Part 1
I added a basic circle shape as the sun that orbits around the sunflower. I later want to add a gradient effect on this too as the sun's edge is quite harsh, but I think the clock will look better if it appears as a soft glow.

#### Padding
Because of the design of the clock, with the sunflower at the centre and the sun and bee orbiting around it, I found the shape of the canvas wasn't necessarily the most fitting for this context. Rather than editing the size of the canvas, I have chosen to add white rectangles to pad out the sides of the canvas. 

#### 

### Part 2: Clock Alarm

### Part 5: Final Clock 