# Project 1:	Space Invaders

The project was coded in Javascript, HTML, and CSS.

Approach

The earliest video game I played as a child was Space Invaders via a hand-me-down Atari console from a cousin. 
You could say that it was nostalgia that was responisble for my decision to choose Space Invaders as my first project.

During the initial planning stage, I proceeded to the drawing board to map out how my game should look like when rendered 
in the browser.  As much as I desired to program a complete replica of the original game,
I was fully aware of my limitations with javascript knowledge and knew I would face obstacles with A.I.
I started with writing pseudocodes of my game logic and tried converting them into programmable codes on pen and paper.  
There were several instances of game logic when I had to research online to find the appropriate javascript codes. 
During my research, I found that while there was quite a substantial amount of resources from coding forums on scripting the 
game , the majority of them utilizes Canvas. 

I did not want to spend a lot of time learning to use Canvas due to the tight deadline so I needed to simplify 
the process for my game. I used block elements created on CSS to represent my ‘battleship’ and ‘invaders’ and set 
boundaries for the browser.

The Learning Process

The first major hurdle I ran into was assigning keyboard events to my battleship. I needed my battleship to move both 
left and right, up and down within its borders and to fire a laser when the assigned key is pressed.  Initially, I 
applied what I’ve learned in class by creating global variables for the chosen keys and assigning the appropriate keycodes 
to it, then adding event listeners for keyboard inputs.  However, my battleship refused to move no matter how many times 
I used console.log to check the functions in the browser or using the debugger tool. None of them revealed any errors!! 

My salvation came in the form of a forum reply to a user whom was facing a similar problem as I was. The solution was 
to create a function to initialize the respective keycodes and writing a seperate function that uses the initialized
keycodes to control the battleship’s movements. The functions were fairly simple and did not need event listeners. 
 
The hardest hurdle for me which was also a huge learning curve was create the ‘collision’ algorithm for my battleship 
vs invaders. As I mentioned earlier that I was going to keep the processes simple due to my current abilities in javascript,
I set the behavior of the invaders as ‘suicide bombers’ such that the player loses the game when the invader collides with 
the battleship.  This eliminates the necessity of creating a more complex algorithm where the invaders will move along with 
the battleship and will fire ammunitions of its own.

I spent hours researching and testing various collision algorithms and finally came across the ‘rectangular collision 
detection algorithm’. It bascially test and returns true if two rectangular bodies are colliding and test for 5 seperate 
conditions ( e.g. If rectangular A’s left edge is to right of B’s right edge, then A is colliding with B).  
Though frustrating, the above function has enabled me to create a playable space invaders game.

Problems unsolved

1. Create and replicate the original invaders i.e. An array of invaders that moves with the player and shoots or drops 
ammunition of its own. I attempted to do so by creating an empty array for invaders and using a for loop to push rows of 
3 by 8 columns of invaders, and creating a local variable for lasers used only in the function of creating invaders. 
However, the invaders were all shooting at the same time and the invaders at the top of the array, were shooting 
the invaders at the bottom.

2. Creating a start game and stop game function.
