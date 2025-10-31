// Songs ka list (array of objects)
const songs = [
    {
        title: "Online Music",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "cover.jpg"
    }
];


// HTML elements ko select karte hain
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentSong = 0; // current playing song index
let isPlaying = false; // track play/pause state

// Function: Song load karne ke liye
function loadSong(song) {
    title.textContent = song.title;
    cover.src = song.cover;
    audio.src = song.file;
}

// Function: Play song
function playSong() {
    audio.play();
    playBtn.textContent = "⏸️";
    isPlaying = true;
}

// Function: Pause song
function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
    isPlaying = false;
}

// Function: Next song
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(songs[currentSong]);
    if (isPlaying) playSong();
}

// Function: Previous song
function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(songs[currentSong]);
    if (isPlaying) playSong();
}

// Play/Pause button click event
playBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

// Next/Prev button events
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Start with first song
loadSong(songs[currentSong]);
