/* get elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* build functions */
function togglePlay() {
  if (video.paused) { // paused is a property that lives on video
    video.play();
  }
  else video.pause();
}

// update play button when the video is playing/paused
function updateBtn() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// skip buttons
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// range update
function rangeUpdate() {
  video[this.name] = this.value;
}

// progress bar
function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// video scrubbing 
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

/* add event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateBtn);
video.addEventListener('pause', updateBtn);
video.addEventListener('timeupdate', updateProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub);
// if mouse is down, run scrub
// if mouse is up, don't do anything
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);
