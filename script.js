let musicArrey = [
    {
        "cover": "img/eftekhari.jpg",
        "music": "music/eftekhari.mp3",
        "title": "eftekhari",
        "singer": "Alireza Eftekhari",
        "name": "Yar Salam"
    },
    {
        "cover": "img/farzadfarokh.jpg",
        "music": "music/farzadfarokh.mp3",
        "title": "farzadfarokh",
        "singer": "Farzad Farokh",
        "name": "Cheshm Ahoo"
    }
];

// select tags
let musicCoverElem = document.querySelector(".cover_img");
let musicElem = document.querySelector(".music");
let timelineElem = document.querySelector(".timeline");
let prevButton = document.querySelector(".prev");
let nextButton = document.querySelector(".next");
let playPauseButton = document.querySelector(".play_pause");
let is_play = document.getElementsByClassName("fa-play");
let timeline = document.getElementsByClassName("music_timeline")[0];
let currentTimeElem = document.querySelector(".current_time");
let durationElem = document.querySelector(".duration");
let musicNameElem = document.querySelector(".music_name");
let singer = document.querySelector(".singer");
let mainTimeline = document.querySelector(".timeline");
let musicIndex;
let rotateDegree = 0;

// add events
playPauseButton.addEventListener("click", play_pause);
prevButton.addEventListener("click", prev_music);
nextButton.addEventListener("click", prev_music);
mainTimeline.addEventListener("click", set_timeline);

function change_play_icon(set_play=false){
    if (set_play){
        if (is_play.length > 0){
            is_play[0].classList = "fas fa-pause";
        };
        return true;
    };
    if (is_play.length > 0){
        is_play[0].classList = "fas fa-pause";
        musicArrey.forEach(
            music => {
                if (music.title == musicElem.title){
                    musicIndex = musicArrey.indexOf(music);
                };
            }
        )
        return "play";
    } else {
        let is_play = document.getElementsByClassName("fa-pause");
        is_play[0].classList = "fas fa-play";
        return "pause";
    };
};

function play_pause(){
    if (change_play_icon() == "play"){
        musicElem.play()
        musicElem.addEventListener("timeupdate", show_timeline);
    } else {
        musicElem.pause()
        musicElem.removeEventListener("timeupdate", show_timeline);
    };
};

function prev_music(){
    change_play_icon(true);
    musicElem.pause();
    musicElem.removeEventListener("timeupdate", show_timeline);
    musicIndex === 0 ? musicIndex = musicArrey.length - 1 : musicIndex --;
    music = musicArrey[musicIndex];
    musicElem.src = music.music;
    musicElem.title = music.title;
    musicCoverElem.style.backgroundImage = "url(" + music.cover + ")";
    musicNameElem.innerHTML = music.name;
    singer.innerHTML = music.singer;
    musicElem.play();
    musicElem.addEventListener("timeupdate", show_timeline);
    rotateDegree = 0;
};

function next_music(){
    change_play_icon(true);
    musicElem.pause();
    musicElem.removeEventListener("timeupdate", show_timeline);
    musicIndex === musicArrey.length - 1 ? musicIndex = 0 : musicIndex ++;
    music = musicArrey[musicIndex];
    musicElem.src = music.music;
    musicElem.title = music.title;
    musicCoverElem.style.backgroundImage = "url(" + music.cover + ")";
    musicNameElem.innerHTML = music.name;
    singer.innerHTML = music.singer;
    musicElem.play();
    musicElem.addEventListener("timeupdate", show_timeline);
    rotateDegree = 0;
};

function show_timeline(){
    let duration = musicElem.duration;
    let currentTime = musicElem.currentTime;
    let durationMin = Math.floor(duration / 60);
    let durationSec = Math.floor(duration % 60);
    let currentTimeMin = Math.floor(currentTime / 60);
    let currentTimeSec = Math.floor(currentTime % 60);
    let timeLineWidth = (currentTime / duration) * 100 + "%";
    currentTimeSec < 10 ? currentTime = currentTimeMin + ": 0" + currentTimeSec : currentTime = currentTimeMin + ":" + currentTimeSec;
    durationSec < 10 ? duration = durationMin + ": 0" + durationSec : duration = durationMin + ":" + durationSec;
    timeline.style.width = timeLineWidth;
    musicCoverElem.style.transform = "rotate(" + rotateDegree + "deg" + ")";
    rotateDegree += 2;
    if (rotateDegree > 365){
        rotateDegree = 0;
    };
    if (!isNaN(durationSec)){
        durationElem.innerHTML = duration;
        currentTimeElem.innerHTML = currentTime;
    };
};

function set_timeline(event){
    let offsetX = event.offsetX;
    let width = this.clientWidth;
    let duration = musicElem.duration;
    if (event.target.className !== "circle"){
        musicElem.currentTime = (offsetX / width) * duration;
    };
};