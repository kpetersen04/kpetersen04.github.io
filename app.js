// landing page
const playBtn = document.querySelector(".playGame");
const pageOne = document.querySelector(".p1");
const pageTwo = document.querySelector(".gamePage");

document.addEventListener("DOMContentLoaded", function () {
  console.log("all connected");
  pageTwo.style.display = "none";
});

function playGame() {
  pageOne.style.display = "none";
  pageTwo.style.display = "flex";
  // document.addEventListener("keydown", startBaddiesMovement);
  document.addEventListener("keydown", move);
}

playBtn.addEventListener("click", playGame);

function returnToPageOne() {
  pageOne.style.display = "flex";
  pageTwo.style.display = "none";
}

// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const width = 28;
const height = 31;
const boxNumb = width * height;
const boxes = [];
let box;
let pokeBallPosition;
let score = 0;
const scoreDisplay = document.querySelector(".scoreDisplay");
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

// 1 - wall - solid color
// 2 - Pokemon to catch - three different ones
// 3 - Engergiser
// 4 - ghost home
// 5 - cutOuts on right and left

function createGrid() {
  for (let i = 0; i < boxNumb; i++) {
    const grid = document.querySelector(".gridBox");
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

function pokeballAppear() {
  pokeBallPosition = 489;
  boxes[pokeBallPosition].classList.remove("pokemon");
  boxes[pokeBallPosition].classList.add("pokeball");
}
pokeballAppear();

const x = pokeBallPosition % width;
function move() {
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
  loseLife();
  checkForWin();
}

// document.addEventListener("keydown", move);

function pokemomEaten() {
  if (boxes[pokeBallPosition].classList.contains("pokemon")) {
    boxes[pokeBallPosition].classList.remove("pokemon");
    score += 10;
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
  console.log("reverted");
}

// random movement of ghosts - this works, don't delete ---------
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
const meowth = new Baddie("meowth", 405, 300);
const jessie = new Baddie("jessie", 406, 400);
const james = new Baddie("james", 433, 500);
const blue = new Baddie("blue", 434, 600);

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

// document.addEventListener("keydown", startBaddiesMovement);

function loseLife(baddie) {
  if (
    boxes[pokeBallPosition].classList.contains("baddies") &&
    !boxes[pokeBallPosition].classList.contains("scared-baddies")
  ) {
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
    // } else if (boxes[pokeBallPosition].classList.contains("scared-baddies")) {
    //   console.log("ghost is scared");
    // Can't remember why I did this - delete when game is finalised
    // }
  }
}
function resetGame() {
  qtBtnClicked = false;
  scoreDisplay.innerHTML = 00;
  score = 0;
  document.querySelector("#life1").classList.add("life");
  document.querySelector("#life1").innerHTML = "L1";
  document.querySelector("#life2").classList.add("life");
  document.querySelector("#life2").innerHTML = "L2";
  document.querySelector("#life3").classList.add("life");
  document.querySelector("#life3").innerHTML = "L3";
  createGrid();

  boxes[pokeBallPosition].classList.remove("pokeball");
  pokeBallPosition = 489;
  boxes[pokeBallPosition].classList.remove("pokemon");
  boxes[pokeBallPosition].classList.add("pokeball");

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
  // document.addEventListener("keydown", startBaddiesMovement);
  // document.addEventListener("keydown", move);
}

function endGame() {
  //   // if endGame button is clicked - Are you sure you want to quit? Y/N options - DONE
  //   // if you loose 3 lives - You loose - DONE
  // document.removeEventListener("keydown", move);
  if (qtBtnClicked === true) {
    returnToPageOne();
    resetGame();
  } else if (!document.querySelector("#life1").classList.contains("life")) {
    scoreDisplay.innerHTML = "You have no more lives. Game Over!";
    boxes[pokeBallPosition].classList.remove("pokeball");
    document.removeEventListener("keydown", move);
    document.removeEventListener("keydown", startBaddiesMovement);
    setTimeout(returnToPageOne, 1000);
    resetGame();
  }

  // else if (score >= 100 && !boxes.classList.contain("pokemon")) {
  //   console.log("endGame");
  // }
}

function checkForWin() {
  if (score >= 2920 && !boxes.classList.contains("pokemon")) {
    console.log("endGame - You win");
    // start here tomorrow with the !boxes.classList.contains("pokemon")
  }
}

// scoreDisplay.innertHTML = "Game Over!";

// remove all ghosts and return to home
// +
// remove and return pokeball to starting position

// if (score >= 2930 && !boxes.classList.contain("pokemon")) {
//   console.log("endGame");
// }

let qtBtnClicked = false;
const qtBtn = document.querySelector(".quitBtn");
qtBtn.addEventListener("click", (buttonEndGame) => {
  qtBtnClicked = true;
  endGame();
});

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
