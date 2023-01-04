document.addEventListener("DOMContentLoaded", function () {
  console.log("all connected");
});

// landing page
// const playBtn = document.querySelector(".playGame");
// const pageOne = document.querySelector(".landingPage");

// playBtn.addEventListener("click", clearP1);

// function clearP1() {
//   // document.body.innerHTML = " ";
//   // pageOne.classList.remove(".p1");
//   // console.log("button clicked");
// }
// –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const width = 28;
const height = 31;
const boxNumb = width * height;
const boxes = [];
let box;
let pokeBallPosition;
let meowthPosition;
let score = 0;
const scoreDisplay = document.querySelector(".scoreDisplay");

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
  boxes[pokeBallPosition].classList.add("pokeball");
}
pokeballAppear();

function addBaddies() {
  meowthPosition = 405;
  // console.log(meowthPosition);
  boxes[meowthPosition].classList.add("meowth");
}
addBaddies();

const x = pokeBallPosition % width;
function move(e) {
  // console.log(event.code);
  if (
    event.code === "ArrowRight" &&
    x < width - 1 &&
    !boxes[pokeBallPosition + 1].classList.contains("wall")
  ) {
    boxes[pokeBallPosition].classList.remove("pokeball");
    pokeBallPosition++;
  } else if (
    event.code === "ArrowLeft" &&
    x !== 0 &&
    !boxes[pokeBallPosition - 1].classList.contains("wall")
  ) {
    boxes[pokeBallPosition].classList.remove("pokeball");
    pokeBallPosition--;
  } else if (
    event.code === "ArrowDown" &&
    pokeBallPosition + width < boxNumb &&
    !boxes[pokeBallPosition + width].classList.contains("wall") &&
    !boxes[pokeBallPosition + width].classList.contains("gHome")
  ) {
    boxes[pokeBallPosition].classList.remove("pokeball");
    pokeBallPosition += width;
  } else if (
    event.code === "ArrowUp" &&
    !boxes[pokeBallPosition - width].classList.contains("wall")
  ) {
    boxes[pokeBallPosition].classList.remove("pokeball");
    pokeBallPosition -= width;
  }

  boxes[pokeBallPosition].classList.add("pokeball");
  caughtScore();
}

document.addEventListener("keydown", move);

function caughtScore() {
  if (boxes[pokeBallPosition].classList.contains("pokemon")) {
    boxes[pokeBallPosition].classList.remove("pokemon");
    score += 10;
    scoreDisplay.innerHTML = score;
  } else if (boxes[pokeBallPosition].classList.contains("energiser")) {
    boxes[pokeBallPosition].classList.remove("energiser");
    score += 10;
    scoreDisplay.innerHTML = score;
    // make ghosts flash for 10 seconds
  }
}
