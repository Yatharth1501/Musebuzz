console.log("welcome to app")
let musearr = ["/songs/a-pirate-343849.mp3", "/songs/supra-drift-phonk-music-139106.mp3", "/songs/money-141327.mp3", "/songs/tyler-259903.mp3", "/songs/lost-story-250928.mp3","/songs/mr-prime-facts7-phonk-291473.mp3"]
let currentIndex = 0;

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

let currentAudio = null;
let text = document.querySelector(".text")
let musediv = document.querySelectorAll(".muse")
let pp = document.querySelector(".pp")

function playSong(index) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0
    }
    currentIndex = index;
    currentAudio = new Audio(musearr[currentIndex]);
    currentAudio.play();
    text.innerText = musediv[currentIndex].innerText
    pp.src = "images/pause.svg"
    currentAudio.addEventListener("timeupdate", () => {
        console.log(formatTime(currentAudio.currentTime), formatTime(currentAudio.duration))
        document.querySelector(".time").innerHTML = `${formatTime(currentAudio.currentTime)}/${formatTime(currentAudio.duration)}`
        document.querySelector(".circle").style.left = (currentAudio.currentTime / currentAudio.duration) * 100 + "%"
    })
}

Array.from(musediv).forEach((e, i) => {
    e.addEventListener("click", () => {
        playSong(i);
    })
})

let play = document.querySelector(".play")
play.addEventListener("click", () => {
    if (currentAudio.paused) {
        currentAudio.play()
        pp.src = "images/pause.svg"
    } else {
        currentAudio.pause()
        pp.src = "images/play.svg"
    }
})

document.querySelector(".seekbar").addEventListener("click", e => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100
    document.querySelector(".circle").style.left = percent + "%"
    currentAudio.currentTime = ((currentAudio.duration) * percent) / 100
})

document.querySelector(".next").addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % musearr.length;
    playSong(nextIndex);
})

document.querySelector(".previous").addEventListener("click", () => {
    let prevIndex = (currentIndex - 1 + musearr.length) % musearr.length;
    playSong(prevIndex);
})
leftbox= document.querySelector(".leftbox")
document.querySelector(".hamburger ").addEventListener("click",()=>{
    leftbox.style.left = "0"
    document.querySelector(".hamburger ").style.display = "none"
})
document.querySelector(".cross  img").addEventListener("click",()=>{
    leftbox.style.left = "-100%"
    document.querySelector(".hamburger ").style.display = "block"
})