const character = document.getElementById("character");
const elapsedTime = document.getElementById("elapsed-time");
const remainingTime = document.getElementById("remaining-time");
const progressFill = document.getElementById("progress-fill");
const playButton = document.querySelector(".play");
const trackTitle = document.querySelector(".track-title");
const trackSubtitle = document.querySelector(".track-subtitle");
const trackAlbum = document.querySelector(".track-album");
const photoCount = document.getElementById("photo-count");
const focusEndSound = new Audio("./assets/focus-end.mp3");
const breakEndSound = new Audio("./assets/break-end.mp3");

const frames = [
  {
    image: "assets/img.jpg",
    title: "Cow",
    subtitle: "Smudge",
    album: "Pomo Playlist"
  },
  {
    image: "assets/0-img.jpg",
    title: "Bunny",
    subtitle: "Bashful Tulip Pink",
    album: "Pomo Playlist"
  },
  {
    image: "assets/1-img.jpg",
    title: "Capybara",
    subtitle: "Clyde",
    album: "Pomo Playlist"
  },
  {
    image: "assets/2-img.jpg",
    title: "Seagull",
    subtitle: "Chip",
    album: "Pomo Playlist"
  },
  {
    image: "assets/3-img.jpg",
    title: "Mole",
    subtitle: "Muswell",
    album: "Pomo Playlist"
  },
  {
    image: "assets/4-img.jpg",
    title: "Frog",
    subtitle: "Ricky Rain",
    album: "Pomo Playlist"
  },
  {
    image: "assets/5-img.jpg",
    title: "SeaLion",
    subtitle: "Roarwell",
    album: "Pomo Playlist"
  },
  {
    image: "assets/6-img.jpg",
    title: "Mars",
    subtitle: "Amuseables Planet",
    album: "Pomo Playlist"
  },
  {
    image: "assets/7-img.jpg",
    title: "Otter",
    subtitle: "Brooke",
    album: "Pomo Playlist"
  },
  {
    image: "assets/8-img.jpg",
    title: "Parrot",
    subtitle: "Budgeby",
    album: "Pomo Playlist"
  },
  {
    image: "assets/9-img.jpg",
    title: "Bear",
    subtitle: "Bartholomew",
    album: "Pomo Playlist"
  },
  {
    image: "assets/10-img.jpg",
    title: "Whale Shark",
    subtitle: "Gobfrey",
    album: "Pomo Playlist"
  },
  {
    image: "assets/11-img.jpg",
    title: "Guinea Pig",
    subtitle: "Gordy",
    album: "Pomo Playlist"
  },
  {
    image: "assets/12-img.jpg",
    title: "Manatee",
    subtitle: "Maffles",
    album: "Pomo Playlist"
  },
  {
    image: "assets/13-img.jpg",
    title: "Wombat",
    subtitle: "Wonda",
    album: "Pomo Playlist"
  }

];

let currentFrame = 0;

setInterval(() => {
  currentFrame = (currentFrame + 1) % frames.length;

  const frame = frames[currentFrame];

  character.src = frame.image;
  photoCount.textContent = `${currentFrame + 1} of ${frames.length}`;

  if (!isBreak) {
    trackTitle.textContent = frame.title;
    trackSubtitle.textContent = frame.subtitle;
    trackAlbum.textContent = frame.album;
  }
}, 700);

const studyTime = 15 * 60;
const breakTime = 5 * 60;

let timeLeft = studyTime;
let isRunning = false;
let isBreak = false;
let timerInterval = null;

function updateTimer() {
  const totalTime = isBreak ? breakTime : studyTime;
  const elapsed = totalTime - timeLeft;

  const elapsedMinutes = Math.floor(elapsed / 60);
  const elapsedSeconds = elapsed % 60;

  elapsedTime.textContent =
    `${String(elapsedMinutes).padStart(2, "0")}:${String(elapsedSeconds).padStart(2, "0")}`;

  const remainingMinutes = Math.floor(timeLeft / 60);
  const remainingSeconds = timeLeft % 60;

  remainingTime.textContent =
    `-${String(remainingMinutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;

  const progress = (elapsed / totalTime) * 100;
  progressFill.style.width = `${progress}%`;



  if (isBreak) {
    trackTitle.textContent = "Break Time";
    trackSubtitle.textContent = "Take A Rest";
    trackAlbum.textContent = "5 Minute Break";
  } else {
    const frame = frames[currentFrame];

    trackTitle.textContent = frame.title;
    trackSubtitle.textContent = frame.subtitle;
    trackAlbum.textContent = frame.album;
  }
  // 진행바 색 변경
  if (isBreak) {
    progressFill.classList.add("break-mode");
  } else {
    progressFill.classList.remove("break-mode");
  }
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
    return;
  }

  isRunning = true;

  timerInterval = setInterval(() => {

  updateTimer();

  if (timeLeft <= 0) {

    clearInterval(timerInterval);

    // 알림음
    if (isBreak) {
      breakEndSound.currentTime = 0;
      breakEndSound.play();
    } else {
      focusEndSound.currentTime = 0;
      focusEndSound.play();
    }

    // 00:00 잠깐 보여주기
    setTimeout(() => {

      isBreak = !isBreak;

      timeLeft = isBreak
        ? breakTime
        : studyTime;

      isRunning = false;

      updateTimer();

      toggleTimer(); // 자동 다음 타이머 시작

    }, 1000);

    return;
  }

  timeLeft--;

}, 1000);
}

playButton.addEventListener("click", toggleTimer);

updateTimer();