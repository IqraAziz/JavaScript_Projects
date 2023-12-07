console.log('Welcome to Spotify');
//Intialize varaiables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgessBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs =[
    {songName: "Butter", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tomorrow", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Boy With love", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "House of Cards", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janiye", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Tmhri qasam - KK", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Salam e Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
]
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
//handle play pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        gif.style.opacity = 0;
    }
})
//Event listen
audioElement.addEventListener('timeupdate', ()=>{
    //updateseekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgessBar.vlaue = progress;
})

myProgessBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgessBar.value * audioElement.duration / 100;
})
// all songs play
const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        masterSongName.innerText = songs[songIndex].songName;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})
//next button
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
//previous button
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})