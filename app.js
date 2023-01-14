// Start of Sound
const audioElement = document.querySelector("audio");
const playSoundBtn = document.querySelector("#play");
const pauseSoundBtn = document.querySelector("#pause");

const startGameSound = "./audio/pacman_beginning.wav";
const catchPokemonSound = "./audio/pacman_chomp.wav";
const deathSound = "./audio/pacman_death.wav";
const eatScaredBaddieSound = "./audio/pacman_eatghost.wav";

// let soundOptions = [
//   startGameSound,
//   catchPokemonSound,
//   deathSound,
//   eatScaredBaddieSound,
// ];
let sound;

let isPauseBtnClicked = false;
let isPlayBtnClicked = false;
isPaused = false;

function playAudio(audio) {
  if (isPaused === false) {
    sound = new Audio(audio);
    sound.play();
  } else;
}

function pauseAudio(audio) {
  if (isPaused === true) {
    sound.pause();
  } else;
}

function pressPlayPauseBtns(audio) {
  if (isPlayBtnClicked === true) {
    isPaused = false;
    playSoundBtn.removeEventListener("click", pressPlayPauseBtns);
    pauseSoundBtn.addEventListener("click", pressPlayPauseBtns);
  } else if (isPauseBtnClicked === true) {
    sound.pause();
    isPaused = true;
    // soundOptions.forEach((option) => pauseAudio());
    pauseSoundBtn.removeEventListener("click", pressPlayPauseBtns);
    playSoundBtn.addEventListener("click", pressPlayPauseBtns);
  }
}

playSoundBtn.addEventListener("click", function () {
  isPlayBtnClicked = true;
  isPauseBtnClicked = false;
  pressPlayPauseBtns();
});
pauseSoundBtn.addEventListener("click", function () {
  isPlayBtnClicked = false;
  isPauseBtnClicked = true;
  pressPlayPauseBtns();
});
// End of Sound --------------------------------
// Start of Landing Page
const playBtn = document.querySelector(".play-game");
const pageOne = document.querySelector(".p1");
const pageTwo = document.querySelector(".game-page");

document.addEventListener("DOMContentLoaded", function () {
  pageTwo.style.display = "none";
  // pageTwo.classList.remove("gamePage");
});

function playGame() {
  // pageOne.classList.add("p1Remove");
  pageOne.style.display = "none";
  pageTwo.style.display = "flex";
  playAudio(startGameSound);

  document.addEventListener("keydown", startBaddiesMovement);
  document.addEventListener("keydown", move);
}

playBtn.addEventListener("click", playGame);

function returnToPageOne() {
  pageOne.style.display = "flex";
  pageTwo.style.display = "none";
}

// End of Landing Page –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Start of Board Setup
let grid;
const width = 28;
const height = 31;
const boxNumb = width * height;
let boxes = [];
let box;
let pokeBallPosition;
let pokemonToCatch = [];
let score = 0;
const scoreDisplay = document.querySelector(".score-display");
const directionOptions = [+1, -1, +width, -width];
let movement =
  directionOptions[Math.floor(Math.random() * directionOptions.length)];

const boardDesign = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2,
  1, 1, 1, 1, 2, 1, 1, 3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1,
  1, 2, 1, 1, 1, 1, 3, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1,
  1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1,
  1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1,
  1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 2,
  2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1,
  2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5,
  5, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 5, 5, 5, 5, 5, 5, 5,
  5, 5, 5, 1, 2, 1, 1, 2, 1, 1, 1, 4, 4, 1, 1, 1, 2, 1, 1, 2, 1, 5, 5, 5, 5, 5,
  1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 4, 4, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1,
  1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 4, 4, 4, 4, 4, 4, 1, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 4, 4, 4, 4, 4, 4, 1, 2, 1, 1, 2,
  1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
  1, 2, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 1, 1, 2, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1,
  1, 1, 2, 1, 1, 2, 1, 5, 5, 5, 5, 5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1,
  1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1,
  1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1,
  1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 3, 2, 2, 1, 1,
  2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 3, 1, 1, 1, 1, 2,
  1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1,
  1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1,
  1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2,
  2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

pokemonToCatch = boardDesign.filter(function (numb) {
  return numb === 2;
});

// 1 - wall - solid color
// 2 - Pokemon to catch - three different ones
// 3 - Engergiser
// 4 - ghost home
// 5 - cutOuts on right and left

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
    } else if (boardDesign[i] === 4) {
      boxes[i].classList.add("gHome");
    } else if (boardDesign[i] === 5) {
      boxes[i].classList.add("cutOuts");
    }
  }
}
createGrid();

function resetGrid() {
  boxes.forEach((box) => box.remove());
  boxes = [];
  createGrid();
}

function pokeballAppear() {
  pokeBallPosition = 489;
  boxes[pokeBallPosition].classList.remove("pokemon");
  boxes[pokeBallPosition].classList.add("pokeball");
}
pokeballAppear();
// End of Board Design -------------------

const x = pokeBallPosition % width;
function move(event) {
  sound.pause();
  boxes[pokeBallPosition].classList.remove("pokeball");
  if (
    event.code === "ArrowRight" &&
    x < width - 1 &&
    !boxes[pokeBallPosition + 1].classList.contains("wall")
  ) {
    pokeBallPosition++;
    if (pokeBallPosition === 419) {
      boxes[pokeBallPosition].classList.remove("pokemon");
      pokeBallPosition = 392;
    }
  } else if (
    event.code === "ArrowLeft" &&
    x !== 0 &&
    !boxes[pokeBallPosition - 1].classList.contains("wall")
  ) {
    pokeBallPosition--;
    if (pokeBallPosition === 392) {
      boxes[pokeBallPosition].classList.remove("pokemon");
      pokeBallPosition = 419;
    }
  } else if (
    event.code === "ArrowDown" &&
    pokeBallPosition + width < boxNumb &&
    !boxes[pokeBallPosition + width].classList.contains("wall") &&
    !boxes[pokeBallPosition + width].classList.contains("gHome")
  ) {
    pokeBallPosition += width;
  } else if (
    event.code === "ArrowUp" &&
    !boxes[pokeBallPosition - width].classList.contains("wall")
  ) {
    pokeBallPosition -= width;
  }
  boxes[pokeBallPosition].classList.add("pokeball");
  pokemomEaten();
  engergiserEaten();
  setTimeout(loseLife(), 250);
  checkForWin();
}

function pokemomEaten() {
  if (boxes[pokeBallPosition].classList.contains("pokemon")) {
    boxes[pokeBallPosition].classList.remove("pokemon");
    // catchPokemonSound.playbackRate = 2;
    playAudio(catchPokemonSound);
    score += 10;
    pokemonToCatch.length -= 1;
    scoreDisplay.innerHTML = score;
  }
}

function engergiserEaten() {
  if (boxes[pokeBallPosition].classList.contains("energiser")) {
    boxes[pokeBallPosition].classList.remove("energiser");
    allBaddies.forEach((baddie) => (baddie.isScared = true));
    setTimeout(revertBaddies, 10000);
  }
}

function revertBaddies() {
  allBaddies.forEach((baddie) => (baddie.isScared = false));
}

class Baddie {
  constructor(className, startPosition, speed) {
    this.className = className;
    this.startPosition = startPosition;
    this.speed = speed;
    this.position = startPosition;
    this.timerId = 0;
    this.isScared = false;
  }
}

// meowth = blinky (follows pac-man direclty)
// jessie = inky (His target is relative to both Blinky and Pac-Man, where the distance Blinky is from Pinky's target is doubled to get Inky's target.)
// james = pinky (chases to the 2 pac-dots in front of pac-man)
// blue = clyde (chases directly after pacman)
const meowth = new Baddie("meowth", 405, 200);
const jessie = new Baddie("jessie", 406, 200);
const james = new Baddie("james", 433, 400);
const blue = new Baddie("blue", 434, 700);

const allBaddies = [meowth, jessie, james, blue];
allBaddies.forEach((baddie) => {
  boxes[baddie.position].classList.add(baddie.className);
  boxes[baddie.position].classList.add("baddies");
});

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

    if (baddie.isScared === true) {
      boxes[baddie.position].classList.add("scared-baddies");
    }

    if (
      boxes[baddie.position].classList.contains("pokeball") &&
      baddie.isScared === true
    ) {
      playAudio(eatScaredBaddieSound);
      boxes[baddie.position].classList.remove(
        baddie.className,
        "baddies",
        "scared-baddies"
      );
      baddie.position = baddie.startPosition;
      boxes[baddie.startPosition].classList.add(baddie.className, "baddies");
      baddie.isScared = false;
      score += 100;
    }
    loseLife();
  }, baddie.speed);
}
function startBaddiesMovement() {
  allBaddies.forEach((baddie) => moveAllBaddies(baddie));
  document.removeEventListener("keydown", startBaddiesMovement);
}

function loseLife(baddie) {
  if (
    boxes[pokeBallPosition].classList.contains("baddies") &&
    !boxes[pokeBallPosition].classList.contains("scared-baddies")
  ) {
    playAudio(deathSound);
    allBaddies.forEach(function (baddie) {
      clearInterval(baddie.timerId);
      boxes[baddie.position].classList.remove(
        baddie.className,
        "baddies",
        "scared-baddies"
      );
      baddie.position = baddie.startPosition;
      boxes[baddie.position].classList.add(baddie.className, "baddies");
    });

    boxes[pokeBallPosition].classList.remove("pokeball");
    pokeBallPosition = 489;
    boxes[pokeBallPosition].classList.add("pokeball");
    document.addEventListener("keydown", startBaddiesMovement);
    document.addEventListener("keydown", move);

    if (document.querySelector("#life3").classList.contains("life")) {
      document.querySelector("#life3").innerHTML = "  ";
      document.querySelector("#life3").classList.remove("life");
    } else if (
      !document.querySelector("#life3").classList.contains("life") &&
      document.querySelector("#life2").classList.contains("life")
    ) {
      document.querySelector("#life2").innerHTML = "  ";
      document.querySelector("#life2").classList.remove("life");
    } else if (!document.querySelector("#life2").classList.contains("life")) {
      document.querySelector("#life1").innerHTML = "  ";
      document.querySelector("#life1").classList.remove("life");
      endGame();
    }
  }
}

function resetGame(i) {
  qtBtnClicked = false;
  score = 0;
  scoreDisplay.innerHTML = score;

  document.querySelector("#life1").classList.add("life");
  document.querySelector("#life1").innerHTML = "L1";
  document.querySelector("#life2").classList.add("life");
  document.querySelector("#life2").innerHTML = "L2";
  document.querySelector("#life3").classList.add("life");
  document.querySelector("#life3").innerHTML = "L3";
  resetGrid();

  boxes[pokeBallPosition].classList.remove("pokeball");
  pokeBallPosition = 489;
  boxes[pokeBallPosition].classList.remove("pokemon");
  boxes[pokeBallPosition].classList.add("pokeball");

  pokemonToCatch.length = 293;

  allBaddies.forEach(function (baddie) {
    clearInterval(baddie.timerId);
    boxes[baddie.position].classList.remove(
      baddie.className,
      "baddies",
      "scared-baddies"
    );

    baddie.position = baddie.startPosition;
    boxes[baddie.position].classList.add(baddie.className, "baddies");
  });
}

function endGame() {
  if (qtBtnClicked === true) {
    allBaddies.forEach(function (baddie) {
      if (baddie.isScared === true) {
        setTimeout(revertBaddies, 500);
        baddie.isScared = false;
      }
    });
    returnToPageOne();
  } else if (!document.querySelector("#life1").classList.contains("life")) {
    scoreDisplay.innerHTML = "You have no more lives. Game Over!";
    boxes[pokeBallPosition].classList.remove("pokeball");
    document.removeEventListener("keydown", move);
    document.removeEventListener("keydown", startBaddiesMovement);
    setTimeout(returnToPageOne, 2000);
  }

  setTimeout(resetGame, 2000);
}

function checkForWin() {
  // if (score >= 2920 && pokemonToCatch.length <= 2) {
  if (score >= 200 && pokemonToCatch.length <= 280) {
    document.removeEventListener("keydown", move);
    scoreDisplay.innerHTML = "YOU WIN!";
    allBaddies.forEach(function (baddie) {
      clearInterval(baddie.timerId);
    });
    setTimeout(returnToPageOne, 2500);
    setTimeout(resetGame, 2500);
  }
}

function pause(baddie) {
  pauseResumeBtn.innerHTML = "Resume Game";
  allBaddies.forEach(function (baddie) {
    clearInterval(baddie.timerId);
  });
  document.removeEventListener("keydown", move);
  pauseResumeBtn.removeEventListener("click", pause);
  pauseResumeBtn.addEventListener("click", resume);
}

function resume() {
  ispauseBtnClicked = false;
  pauseResumeBtn.innerHTML = "Pause Game";
  allBaddies.forEach(function (baddie) {
    clearInterval(baddie.timerId);
  });
  document.addEventListener("keydown", move);
  document.addEventListener("keydown", startBaddiesMovement);
  startBaddiesMovement();
  pauseResumeBtn.removeEventListener("click", resume);
  pauseResumeBtn.addEventListener("click", pause);
}

let qtBtnClicked = false;
const qtBtn = document.querySelector(".quit-btn");
qtBtn.addEventListener("click", (buttonEndGame) => {
  qtBtnClicked = true;
  resume();
  endGame();
});

let ispauseBtnClicked;
const pauseResumeBtn = document.querySelector(".pause-resume-btn");
pauseResumeBtn.addEventListener("click", pause);

// ------DONT TOUCH BELOW---------- RETURN TO WHEN YOU WANT TO WORK ON LOGICAL MOVEMENT OF THE GHOSTS

// class Baddie {
//   constructor(className, startPosition, speed) {
//     this.className = className;
//     this.startPosition = startPosition;
//     this.speed = speed;
//     this.position = startPosition;
//     this.timerId = 0;
//     this.x = 0;
//     this.y = 0;
//   }
// }

// // // meowth = blinky (follows pac-man direclty)
// // // jessie = inky (His target is relative to both Blinky and Pac-Man, where the distance Blinky is from Pinky's target is doubled to get Inky's target.)
// // // james = pinky (chases to the 2 pac-dots in front of pac-man)
// // // blue = clyde (chases directly after pacman)
// const meowth = new Baddie("meowth", 405, 300);
// // // const jessie = new Baddie("jessie", 406, 400);
// // // const james = new Baddie("james", 433, 500);
// // // const blue = new Baddie("blue", 434, 600);

// // // const allBaddies = [meowth, jessie, james, blue];
// const allBaddies = [meowth];

// // console.log(meowth.position);

// allBaddies.forEach((baddie) => {
//   boxes[baddie.position].classList.add(baddie.className);
//   boxes[baddie.position].classList.add("baddies");
// });

// function getCoordinates(index) {
//   return [index % width, Math.floor(index / width)];
//   // The first number returns the x coordinate and the second number returns the y coordinate of the relevant index
// }

// COME BACK TO THIS FUNCTION ONCE YOU GET MOST OF THE GAME WORKING -----------
// function moveAllBaddies(baddie) {
//   const directionOptions = [+1, -1, +width, -width];
//   let movement =
//     directionOptions[Math.floor(Math.random() * directionOptions.length)];
//   baddie.timerId = setInterval(function () {
//     if (
//       !boxes[baddie.position + movement].classList.contains("wall") &&
//       !boxes[baddie.position + movement].classList.contains("baddies")
//     ) {
//       const [pokeBallX, pokeBallY] = getCoordinates(pokeBallPosition);
//       // console.log(`pokeball location: ${[pokeBallX, pokeBallY]}`);
//       const [baddieX, baddieY] = getCoordinates(baddie.position);
//       // console.log(`baddie location: ${[baddieX, baddieY]}`);
//       const [newBaddieX, newBaddieY] = getCoordinates(
//         baddie.position + movement
//       );
//       // console.log(`new baddie location: ${[newBaddieX, newBaddieY]}`);
//       function isXCloser() {
//         if (newBaddieX - pokeBallX > baddieX - pokeBallX) {
//           return true;
//         }
//         return false;
//       }
//       // console.log(`x =${isXCloser()}`);

//       function isYCloser() {
//         if (newBaddieY - pokeBallY > baddieY - pokeBallY) {
//           return true;
//         }
//         return false;
//       }
//       // console.log(`y =${isYCloser()}`);
//       if (isXCloser() === true || isYCloser() === true) {
//         console.log("correct coord.");
//         boxes[baddie.position].classList.remove(baddie.className, "baddies");
//         baddie.position += movement;
//         boxes[baddie.position].classList.add(baddie.className, "baddies");

// THIS WORKS UNTIL YOU HIT A WALL AND THEN IT DOESNT MOVE AFTER THAT, PROBLEM HERE?
//       } else {
//         movement =
//           directionOptions[Math.floor(Math.random() * directionOptions.length)];
//       }
//     }
//   }, baddie.speed);
// }

// function startBaddiesMovement() {
//   allBaddies.forEach((baddie) => moveAllBaddies(baddie));
//   document.removeEventListener("keydown", startBaddiesMovement);
// }

// document.addEventListener("keydown", startBaddiesMovement);

// ------------------------
