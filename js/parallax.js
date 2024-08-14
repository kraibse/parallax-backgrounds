const layers = document.querySelectorAll('.layer');

const autoplayButton = document.querySelector('#btn-autoplay');
const panLeft = document.querySelector('#btn-pan-left');
const panRight = document  .querySelector('#btn-pan-right');

const speedModifier = 2 / 100;

var direction = -1;
var isRunning = false;
let animationFrameId = null;

autoplayButton.addEventListener('click', () => {
  isRunning = !isRunning;

  if (isRunning) {
    console.log("Running the parallax");
    animateBackground();
  } else {
    console.log("Stopping the parallax");
    cancelAnimationFrame(animationFrameId);
  }
});

function animateBackground() {
  layers.forEach(layer => {
    const layerSpeed = parseInt(layer.getAttribute('data-speed'));
    const currentX = parseInt(layer.style.backgroundPositionX) || 0;
    const offsetX = currentX + layerSpeed * speedModifier * direction;

    layer.style.backgroundPositionX = offsetX + 'px';
  });

  animationFrameId = requestAnimationFrame(animateBackground);
}

panLeft.addEventListener('mousedown', () => {
  direction = 1;
  isRunning = true;
  cancelAnimationFrame(animationFrameId);
  animateBackground(); // Start animation on mousedown
});

panLeft.addEventListener('mouseup', () => {
  isRunning = false;
  cancelAnimationFrame(animationFrameId); // Stop animation on mouseup
});

panRight.addEventListener('mousedown', () => {
  direction = -1;
  isRunning = true;
  cancelAnimationFrame(animationFrameId);
  animateBackground(); // Start animation on mousedown
});

panRight.addEventListener('mouseup', () => {
  isRunning = false;
  cancelAnimationFrame(animationFrameId); // Stop animation on mouseup
});
