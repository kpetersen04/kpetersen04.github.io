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

// const boxNumb = 868;

function createGrid(i) {
  const grid = document.querySelector(".gridBox");
  const box = document.createElement("div");
  box.innerText = "•";
  grid.appendChild(box);
}
for (let i = 1; i <= boxNumb; i++) {
  createGrid(i);
}
