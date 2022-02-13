const arr=['spike_A','spike_B','spike_C','spike_D'];
const player=document.querySelector('.player');
const obstacle=document.querySelector('.spike');
const button=document.querySelector('.button');
const viewbox=document.querySelector('.viewbox');
const score=document.querySelector('.score');
const sound=document.querySelector('.sound');
const levelSound=document.querySelector('.level_sound');
const play=document.querySelector('h2');
const body=document.querySelector('body');
const endSound=document.querySelector('.end_sound');
let state=true;
let sc;
sound.volume=0.3;
levelSound.volume=0.3;
endSound.volume=0.3;

play.addEventListener('click',()=>{
    body.className="start";
    sound.play();
    sc=0;
})

function jump(){
    player.classList.add('animate');
    setTimeout(() => {
        player.classList.remove('animate');
    }, 500);
}

document.addEventListener('keydown',e => {
    if (e.code === 'Space' && !player.classList.contains('animate')) {
        jump();
        viewbox.classList.remove('paused');
        state=true;
        if (body.className=='start') {
            sound.play();
        }
        setTimeout(bg_change,450);}
    })

button.addEventListener('click',()=>{
    state=!viewbox.classList.toggle('paused');
    if (state)
        sound.play();
    else
        sound.pause();
});

let checkDead = setInterval(function() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue('left'));
    if (state)
        sc+=1;
        if (sc>=1000 && sc%1000>=0 && sc%1000<=2){
            levelSound.play();
            score.style.animation='blink 0.3s steps(5) 5';
            setTimeout(function(){
                score.style.animation='none';
            },2000);
        }
    score.innerHTML=sc;
    if (obstacleLeft<120 && obstacleLeft>20 && playerTop>=240) {
        viewbox.classList.add('paused');
        sound.pause();
        endSound.play();
        alert(`GAME OVER \nScore: ${sc-1}`);
        window.location.reload();
    }
}, 10);

const bg_change = function(){
    let spike = arr[Math.floor(Math.random() * arr.length)];
    obstacle.style.backgroundImage = `url('${spike}.png')`;
}

