# ![Logo](https://i.imgur.com/p0U8Ss5m.png) 
# PokeMan Game
For my first coding project, I built a browser-based game created with vanilla JavaScript. I took inspiration from the 1980s game Pacman and the popular Pokemon series.

Fancy testing yourself against Team Rocket and catching some Pokemon? [Play PokeMan here!](https://kpetersen04.github.io/)

## Demo

Make a gif of the game and insert here - include landing page and 
![](https://git.generalassemb.ly/kpetersen04/PokeMan/blob/main/images/PokeMan.gif)


## Tech Stack
HTML, CSS, JavaScript, Git, GitHub, Escalidraw, Pixlr and MS PowerPoint. 
## Project Overview 

#### The Brief
The game was required to:
- Be rendered in the browser.     
- Built with a grid. 
- Include logic for winning and visually display when the player won. 
- Include separate HTML, CSS and JavaScript files. 
- Use JavaScript for DOM manipulation. 
- Deploy online.
- Include semantic markup for HTML and CSS.
- Completed within a 14 days. 

#### Stage One: Planning 
I really enjoyed this portion of the project as I am a natural planner and researcher. I used Excalidraw, a virtual whiteboard, to lay out the look I wanted for my game and list the setup and game logic I would need to design. 

![App Screenshot](https://i.imgur.com/7fFtqAXl.png)

As I worked through my project, I continued to use Excalidraw to keep track of what I had completed, listing minor bugs and changes I wanted to go back to, and keeping track of the tasks I still had to do. This helped me to manage my time, know when to move on and also feel a sense of accomplishment as I ticked items off my list. 

![App Screenshot](https://i.imgur.com/f3kmfG3m.png)

At the end of each coding session I would also write a note to myself of what I would work on the next time I was coding the game. This allowed me to return and start working without trying to figure out where I left off or what I should do next. This really helped me to use my time wisely.

#### Stage Two: The Basic Requirements
The next stage in my mind was to complete the basic requirements of the game. I set up the grid and included some basic styling, this helped me to see what my end result could look like and got me excited to continue working. 

I then moved on to the core game logic including the movement of the Pokeball and Team Rocket, updating the score as the pokemon were caught and then creating the logic to remove lives from the board when the pokeball got caught. 

INSERT LIVESLOST CODE
```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

The final core function I worked on was the win function. I saved this function for last as I thought it would be pretty straightforward but it ended up being one of the more challenging aspects for me.  I found it easy to set up a win based on the minimum possible score but then needed to find a way to also make the win dependent on if the board was cleared of pokemon. 

INSERT WIN FUNCTION CODE
```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```
Early on in this stage I started working on code to make Team Rocket’s movements more logical by having at least one of them chase after the Pokeball directly. Although I made some progress with this, I soon made the decision to move on to other core functions due to time constraints. However, I found that they would get stuck in the home base and therefore weren’t a very engaging part of the game. Although I decided to leave their movement set to random, I did design some code which would move them out of home base before their random movement started. This ensured they were on the board soon after starting the game and could pose a real threat to the Pokeball. 

INSERT EXIT GHOME   CODE
```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```
#### Stage Three: The Little Extras
Once I was happy with the core requirements of my game I moved on to additional extras which I thought would add the most value to the game. These included the addition of a landing page, a pause and resume button, audio for the game and play and pause icons which control the sound. 

#### Stage Two: Additional Time
On presentation day there was some time built in to deal with last minute bugs. I was happy with my game at this point but used the time to make my engergisers flash. I chose this as I thought I could complete it in the time left without negatively impacting any of my other completed code. 

With even more time, I would like to: 

- Make the 'You win' and 'You lose' message appear on the board (currently replaces the score total). 
- Work on the 'chomp' sound used when a pokemon is eaten as it doesn't function corrrectly when an arrow key is held down for fast pokeball movement. 
- Make the game page responsive so it can be played on tablets and mobile phones. 
- Make the Team Rocket movements logical so they chase after the pokeball under different conditions. 
- Add additional levels with differences in scoring, speed and styling. 

## The Wins
- Leaving notes for myself on what I should start with when I returned to working on my game. Helped me focus and with my time management. 
- Resetting the game, taking into consideration which buttons were clicked when the player ended the game. I systemtically worked through all possible varations to ensure that board reset correctly. 
- The loseLife() felt like a real mental win as the logic for that came with ease. 
- The logical movement of Team Rocket out of their homebase and into the maze where their movement then became randomized. 
## Lessons Learned
#### 1. Code Location

I struggled to know where to put specific bits of code to make it run successfully. In some cases it was trial and error that made it work successfully. But I developed a habit of talking through what should happen next and moving around in the code to see the next steps. While still a challenge for me, this is something I noticed improving as the project progressed. 

#### 2. Coding Challenge: 
had an issue with the baddies returning home flashing not scared 
and then reverting right away to scared. Tried using the revertBaddies()
but this changed them all and then fixed the issue by setting 
baddies.isScared = false; 

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

#### 3. Editing Tools 
I ended up having to research how to remove backgrounds from images and how to edit two images together for the logo for use in my game. This was not knowledge I expected to need but putting in the effort to gain this knowledge through the use of Pixlr and PowerPoint resulted in a more visually appealing game and was worth the time. 

