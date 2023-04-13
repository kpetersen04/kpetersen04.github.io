# ![Logo](https://i.imgur.com/p0U8Ss5.png)

For my first independent coding project, I built a browser-based game created with vanilla JavaScript. I took inspiration from the 1980s game Pacman and the popular Pokemon series.

Fancy testing yourself against Team Rocket and catching some Pokemon? [Play PokeMan here!](https://kpetersen04.github.io/)

## Demo

<p align='center'>
<img alt='PokeMan animation' src='https://kpetersen04.github.io/images/landingpage:start.gif'>
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
- Be completed within 14 days.

### Stage One: Planning

I am a natural planner and researcher, so this part of the project came easily to me. I used Excalidraw, a virtual whiteboard, to lay out the look I wanted for my game and list the setup and game logic I would need to design.

<p align='center'>
<img alt='Excalidraw plan' style='width: 550px' src='https://kpetersen04.github.io/images/V1_PokeMonPlanning.png'>
</p>

As I worked through my project, I continued to use Excalidraw to keep track of what I had completed, listing minor bugs and changes I wanted to go back to, and keeping track of the tasks I still had to do. This helped me to manage my time, know when to move on and also feel a sense of accomplishment as I ticked items off my list.

### Stage Two: The Core Requirements

I then set up the core requirements of the game including the game board/maze and some key styling, this helped me to see what my end result could look like and got me excited to continue working.

To set the board up, I created a boardDesign array which included a series of numbers (1-5) laid out in a specific pattern. I then included a createGrid function which created each individual box for the board and pushed each box to an empty boxes array. I then assigned each box a classList property based on the number included at each index, allowing me to populate the visuals and the characters for the game.

```javascript
function createGrid() {
  for (let i = 0; i < boxNumb; i++) {
    grid = document.querySelector(".grid-box");
    box = document.createElement("div");
    grid.appendChild(box);
    boxes.push(box);

    if (boardDesign[i] === 1) {
      boxes[i].classList.add("wall");
    } else if (boardDesign[i] === 2) {
      boxes[i].classList.add("pokemon");
    } else if (boardDesign[i] === 3) {
      boxes[i].classList.add("energiser");
      boxes[i].classList.add("flash");
    } else if (boardDesign[i] === 4) {
      boxes[i].classList.add("gHome");
    } else if (boardDesign[i] === 5) {
      boxes[i].classList.add("cutOuts");
    }
  }
}
createGrid();
```

I then moved on to the core game logic including:

- The Pokeball movement on the board.
- Team Rocket's movement on the board.
- Updating the score as the pokemon were caught and when the Pokeball caught a flashing blue Team Rocket member.
- Monitoring and visually updating the Pokeball lives lost.
- The win function.

For the win function I took into account both the total score, which had to be greater than or equal to 2920 and if all the pokemon had been cleared from the board. Once these requirements were met the keydown event listener was removed and the player wasn't able to move the Pokeball any further. ClearInterval was also called to stop the movement of Team Rocket and the final game result was then displayed with the 'YOU WIN' notice. After 2.5 seconds the returnToPageOne and resetGame functions were called to wipe the game and allow the player to start the game again from the landing page.

```javascript
function checkForWin() {
  if (score >= 2920 && pokemonToCatch.length === 2) {
    document.removeEventListener("keydown", move);
    isWon = true;
    displayEndGameNotice(isWon);
    allBaddies.forEach(function (baddie) {
      clearInterval(baddie.timerId);
    });
    setTimeout(returnToPageOne, 2500);
    setTimeout(resetGame, 2500);
  }
}
```

I started work to make Team Rocket’s movements more logical by having at least one of them chase after the Pokeball directly. However, I soon made the decision to make their movements random by setting a directionsOptions variable to an array with four possible directions and then setting a movement variable to generate a random index which would determine the next move of a member of Team Rocket.

```javascript
const directionOptions = [+1, -1, +width, -width];
let movement =
  directionOptions[Math.floor(Math.random() * directionOptions.length)];
```

This resulted in the potential of Team Rocket to get stuck in their homebase for a long time during the game. To resolve this, I created some code which would move them out of home base before their random movement started.

I did this by setting an exitLaneNumbers array to include a list of the indexes of the exit lane divs and within the moveAllBaddies function checking if the current index position of the baddie was one of the exitLaneNumbers. If the position included one of the numbers, the baddie.position would be set to minus the width (-28), meaning the position would change one full line up, moving the baddie out of the homebase line by line. Once it hit an index not included in the exitLaneNumbers array the movement would be set to random. This ensured Team Rocket were on the board soon after the game started and could pose a real threat to the Pokeball.

```javascript
const exitLaneNumbers = [349, 377, 405, 350, 378, 406, 433, 434];

function moveAllBaddies(baddie) {
  baddie.timerId = setInterval(function () {
    if (exitLaneNumbers.includes(baddie.position)) {
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

### Stage Three: Extras

I then moved on to the additional extras which I thought would add the most value to the game. These included:

- A landing page.
- A Pause and Resume button, allowing the player to leave their game and return to the same spot when they resumed.
- A Quit Game button that reset the board and returned the player to the homepage.
- Audio while the game is loading, when the Pokeball catches a pokemon, when the Pokeball dies and when the Team Rocket is sent home while scared.
- Play and Pause icons to allow the player to control the sound.
- Making the yellow energisers flash constantly on the board.
- Make the 'YOU WIN' and 'GAME OVER' messages appear over the board.

When the displayEndGameNotice function was called, an endGameNotice div would be created with the game-result class added. Based on if the isWon variable was set to true or false the innerHTML would be set to either 'YOU WIN' or 'GAME OVER' and the newly created div would be appended to the grid.

The revertEndGameNotice function would then be called when the display should be cleared from the game screen. This was done by removing the game-result class and removing the endGameNotice from the grid.

```javascript
function displayEndGameNotice(isWon) {
  endGameNotice.classList.add("game-result");
  endGameNotice.innerHTML = `${isWon ? "YOU WIN!" : "GAME OVER!"}`;
  grid.appendChild(endGameNotice);
}
function revertEndGameNotice() {
  isWon = false;
  endGameNotice.innerHTML = " ";
  endGameNotice.classList.remove("game-result");
  grid.removeChild(endGameNotice);
}
```

### Stage Four: Future Features

With more time, I would like to:

- Work on the 'chomp' sound used when a pokemon is eaten.
- Make the game page responsive so it can be played on tablets and mobile phones.
- Make the Team Rocket movements logical so they chase after the pokeball under different conditions.

## The Wins

- Writing a quick note for myself on what I should start with when I returned to working on my game. This helped me focus and use my available time wisely.
- Resetting the game, taking into consideration which buttons were clicked when the player ended the game. I systematically worked through all possible variations to ensure that the board reset correctly.
- The loseLife() felt like a win as the logic for that function came with ease.
- The logical movement of Team Rocket out of their homebase and into the maze where their movement then became randomized.

## Challenges

I experienced a bug where Team Rocket, when flashing blue and caught by the Pokeball, would be sent back to base, flash back to their normal state and then revert right away 'to scared'.
I attempted to resolve this by using the revertBaddies() but this changed them all back to their normal state. I was able to fix this bug by setting a baddies.isScarred variable to false and monitoring/updating this throughout the game.

## Lessons Learned

- Code Location: I struggled to know where to put specific bits of code to make it run successfully. To overcome this, I developed a habit of verbally talking through what should happen next and moving through the code in order to see where code should sit.

- Editing Tools: I ended up having to investigate photo editing tools to remove backgrounds and edit two images together. Putting in the effort to gain this additional knowledge resulted in a more visually appealing game and was worth the time.
