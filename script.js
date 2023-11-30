const songs = [
  "Rick Astley - Never Gonna Give You Up.mp3",
  "椎名もた(siinamota) - Young Girl A  少女A",
  "You Ballin in the wrong Halem (Mashup - Ballin x Casin)",
  "Song of Unhealing",
  "Song of Healing - The Legend of Zelda Majora's Mask",
  "Astral Observatory - The Legend of Zelda Majora's Mask",
  "End credits (Zora Song Portion + Extended) - The Legend of Zelda Majora's Mask",
];

const songNames = songs.map(song => song.replace('.mp3', ''));

const player = document.getElementById("player");

const createSongList = () => {
  const list = document.createElement("ol");
  for (let i = 0; i < songNames.length; i++) {
    const item = document.createElement("li");
    item.appendChild(document.createTextNode(songNames[i]));
    list.appendChild(item);
  }
  return list;
};

const songList = document.getElementById("songList");
songList.appendChild(createSongList());
const links = document.querySelectorAll("li");
for (const link of links) {
  link.addEventListener("click", setSong);
}

function setSong(e) {
  document.querySelector("#headphones").classList.remove("pulse");

  const source = document.getElementById("source");
  source.src = "songs/" + e.target.innerText + ".mp3";;
  document.getElementById(
    "currentSong"
  ).innerText = `Now Playing:  ${e.target.innerText}`;

  player.load();
  player.play();

  document.querySelector("#headphones").classList.add("pulse");
}

function playAudio() {
  if (player.readyState) {
    player.play();
  }
}

function pauseAudio() {
  player.pause();
}

const slider = document.getElementById("volumeSlider");
slider.oninput = function (e) {
  const volume = e.target.value;
  player.volume = volume;
};

function updateProgress() {
  if (player.currentTime > 0) {
    const progressBar = document.getElementById("progress");
    progressBar.value = (player.currentTime / player.duration) * 100;
  }
}

var progressBar = document.getElementById("progress");
progressBar.addEventListener("click", (e) => {
  const clickedTime = (e.offsetX / progressBar.clientWidth) * player.duration;
  player.currentTime = clickedTime;
  updateProgress();
});

var progressBar = document.getElementById("progress");
let isDragging = false;

progressBar.addEventListener("mousedown", () => {
  isDragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const clickedTime = (e.offsetX / progressBar.clientWidth) * player.duration;
    player.currentTime = clickedTime;
    updateProgress();
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});