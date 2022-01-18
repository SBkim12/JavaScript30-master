/* Get our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* Build out Functions */

//비디오 재생/정지 토글 함수
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

//비디오 재생/정지에 따라 버튼 모양 변경 함수
function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  console.log(icon);
  toggle.textContent = icon;
}

//비디오 스킵 함수
function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseFloat(this.dataset.skip);
}

// 음량/속도 조절
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// 영상 진행바 동작 함수
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// 연상 진행바 조작 함수
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event Listeners */

//영상 동작 관련
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

//영상 화면에 오버되는 재생 버튼 관련
toggle.addEventListener("click", togglePlay);

//스킵 버튼 함수 연결
skipButtons.forEach((button) => button.addEventListener("click", skip));

//음량/속도 함수 연결
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);

// 진행바 마우스 클릭여부 체크 변수
let mousedown = false;

//영상 진행바 함수 연결
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
