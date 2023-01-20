# ![Logo](https://i.imgur.com/p0U8Ss5.png)

For my first coding project, I built a browser-based game created with vanilla JavaScript. I took inspiration from the 1980s game Pacman and the popular Pokemon series.

Fancy testing yourself against Team Rocket and catching some Pokemon? [Play PokeMan here!](https://kpetersen04.github.io/)

## Game Demo

<p align="center">
  <img src="https://github.com/kpetersen04/kpetersen04.github.io/blob/main/images/landgingpage:start.gif" alt="animated" height='400px/>
</p>

## Tech Stack

HTML, CSS, JavaScript, Git, GitHub, VSCode, Excalidraw, Pixlr and MS PowerPoint.

## Project Overview

### The Brief

The game was required to:

- Be rendered in the browser.
- Built with a grid.
- Include logic for winning and visually display when the player won.
- Include separate HTML, CSS and JavaScript files.
- Use JavaScript for DOM manipulation.
- Deploy online.
- Include semantic markup for HTML and CSS.
- Completed within a 14 days.

### Stage One: Planning

I am a natural planner and researcher, so this part of the project came easily to me. I used Excalidraw, a virtual whiteboard, to lay out the look I wanted for my game and list the setup and game logic I would need to design.

![App Screenshot](https://i.imgur.com/7fFtqAXl.png)

As I worked through my project, I continued to use Excalidraw to keep track of what I had completed, listing minor bugs and changes I wanted to go back to, and keeping track of the tasks I still had to do. This helped me to manage my time, know when to move on and also feel a sense of accomplishment as I ticked items off my list.

### Stage Two: The Core Requirements

The next stage included completing the basic requirements of the game. I set up the grid and included some basic styling, this helped me to see what my end result could look like and got me excited to continue working.

I then moved on to the core game logic including:

- The Pokeball movement on the board.
- Team Rocket movement on the board.
- Updating the score as the pokemon were caught and when the Pokeball caught a flashing blue Team Rocket member.
- Monitoring and visually updating the Pokeball lives lost.

```javascript
if (document.querySelector("#life3").classList.contains("life")) {
  document.querySelector("#life3").innerText = "  ";
  document.querySelector("#life3").classList.remove("life");
} else if (
  !document.querySelector("#life3").classList.contains("life") &&
  document.querySelector("#life2").classList.contains("life")
) {
  document.querySelector("#life2").innerText = "  ";
  document.querySelector("#life2").classList.remove("life");
} else if (!document.querySelector("#life2").classList.contains("life")) {
  document.querySelector("#life1").innerText = "  ";
  document.querySelector("#life1").classList.remove("life");
  endGame();
}
```

- The win function.

```javascript
function checkForWin() {
  if (score >= 2920 && pokemonToCatch.length <= 2) {
    document.removeEventListener("keydown", move);
    scoreDisplay.innerText = "YOU WIN!";
    allBaddies.forEach(function (baddie) {
      clearInterval(baddie.timerId);
    });
    setTimeout(returnToPageOne, 2500);
    setTimeout(resetGame, 2500);
  }
}
```

I started working on code to make Team Rocket’s movements more logical by having at least one of them chase after the Pokeball directly. However, I soon made the decision to move on to other core functions due to time constraints.

In order to fix the issue of Team Rocket getting stuck in their homebase when their movements were set to random, I created some code which would move them out of home base before their random movement started. This ensured they were on the board soon after starting the game and could pose a real threat to the Pokeball.

```javascript
const exitLaneNumbs = [349, 377, 405, 350, 378, 406, 433, 434];

function moveAllBaddies(baddie) {
  baddie.timerId = setInterval(function () {
    if (exitLaneNumbs.includes(baddie.position)) {
      boxes[baddie.position].classList.remove(
        baddie.className,
        "baddies",
        "scared-baddies"
      );
      baddie.position -= width;
      boxes[baddie.position].classList.add(baddie.className, "baddies");
    } else if (
      !boxes[baddie.position + movement].classList.contains("wall") &&
      !boxes[baddie.position + movement].classList.contains("baddies") &&
      !boxes[baddie.position + movement].classList.contains("gHome")
    ) {
      boxes[baddie.position].classList.remove(
        baddie.className,
        "baddies",
        "scared-baddies"
      );
      baddie.position += movement;
      boxes[baddie.position].classList.add(baddie.className, "baddies");
    } else {
      movement =
        directionOptions[Math.floor(Math.random() * directionOptions.length)];
    }
    ....
```

### Stage Three: The Little Extras

I then moved on to additional extras which I thought would add the most value to the game. These included:

- A landing page.
- A Pause and Resume button, allowing the player to leave their game and return to the same spot when they resumed.
- A Quit Game button that reset the board and returned the player to the homepage
- Audio while the game is loading, when the Pokeball catches a pokemon, when the Pokeball dies and when the Team Rocket is sent home while scared.
- Play and pause icons to allow the player to control the sound.
- Making the yellow engergisers flash constantly on the board.

### Stage Two: Additional Time

With more time, I would like to:

- Make the 'You win' and 'You lose' message appear on the board (currently replaces the score total).
- Work on the 'chomp' sound used when a pokemon is eaten as it doesn't function corrrectly when an arrow key is held down.
- Make the game page responsive so it can be played on tablets and mobile phones.
- Make the Team Rocket movements logical so they chase after the pokeball under different conditions.
- Add additional levels with differences in scoring, speed and styling.

## The Wins

- Writing a quick note for myself on what I should start with when I returned to working on my game. This helped me focus and use my available time wisely.
- Resetting the game, taking into consideration which buttons were clicked when the player ended the game. I systemtically worked through all possible varations to ensure that board reset correctly.
- The loseLife() felt like a win as the logic for that fucntion came with ease.
- The logical movement of Team Rocket out of their homebase and into the maze where their movement then became randomized.

## Lessons Learned

- Code Location: struggled to know where to put specific bits of code to make it run successfully. To overcome this, I developed a habit of verbally talking through what should happen next and moving through the code in that order to see where code should sit.

- Specific Coding Challenge:
  I experienced a bug where Team Rocket, when flashing blue and caught by the Pokeball, would be sent home, flash back to their normal state and then reverting right away to scared.
  I attempted to resolve this by using the revertBaddies() but this changed them all back to their normal state. I was able to fix this bug by setting a baddies.isScarred varaible to false and monitoring/updating this throughout the game.

- Editing Tools: I ended up having to investigate photo edting tools to remove backgrounds and edit two images together. Putting in the effort to gain this additional knowledge resulted in a more visually appealing game and was worth the time.
