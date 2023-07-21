const body = document.body;
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
////

// functions
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function colorSwitcher() {
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}
////

let colorInterval;

// buttons
startButton.addEventListener('click', () => {
  startButton.classList.add('active');
  stopButton.classList.remove('active');

  colorInterval = setInterval(colorSwitcher, 1000);
});

stopButton.addEventListener('click', () => {
  stopButton.classList.add('active');
  startButton.classList.remove('active');

  clearInterval(colorInterval);
});
////
