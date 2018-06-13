var paused = true;
var currentIteration = 0;
var section = 'Work';

var minInput = document.querySelector('.pomodoro__minutes');
var secInput = document.querySelector('.pomodoro__seconds');
const zeroPad = num => num < 10 ? '0' + num : num

window.setInterval(function() {
  var tempPaused = [minInput, secInput].indexOf(document.activeElement) > -1;
  
  if (!paused && !tempPaused) {
    var min = parseInt(minInput.value);
    var sec = parseInt(secInput.value);
    
    var totalSec = min * 60 + sec;
    if (--totalSec <= 0) {
      totalSec = nextIteration();
    }
    
    setTimeInputs(totalSec);
  }
  
  document.title = `${section} - ${zeroPad(newMin)}:${zeroPad(newSec)}` + paused ? ' (paused)' : '';
}, 1000);

function setTimeInputs(totalSec) {
  var newSec = totalSec % 60;
  var newMin = (totalSec - newSec) / 60;

  minInput.value = zeroPad(newMin);
  secInput.value = zeroPad(newSec);
}

var toggleButton = document.querySelector('.pomodoro__toggle');
function togglePaused(newValue) {
  if (newValue == null) newValue = !paused
  paused = newValue;
  if (paused) {
    toggleButton.classList.remove('pomodoro__toggle--pause');
    toggleButton.classList.add('pomodoro__toggle--play');
  } else {
    toggleButton.classList.remove('pomodoro__toggle--play');
    toggleButton.classList.add('pomodoro__toggle--pause');
  }
}

toggleButton.addEventListener('click', () => togglePaused());
  
function nextIteration() {
  return startIteration(currentIteration + 1);
}

function startIteration(n) {
  currentIteration = n;
  if (currentIteration % 2 == 0) {
    // Timer
    section = 'Work';
    document.querySelector('.pomodoro__section').innerHTML = 'Work';
    document.body.classList.remove('breakMode');
    return 25 * 60;
  } else {
    // Break
    section = 'Break';
    document.querySelector('.pomodoro__section').innerHTML = 'Break';
    document.body.classList.add('breakMode');
    if (currentIteration % 7 == 0) return 15 * 60; // Long break
    return 5 * 60; // Short break
  }
}

document.querySelector('.pomodoro__restart').addEventListener('click', function () {
  setTimeInputs(startIteration(0));
  togglePaused(true);
});
