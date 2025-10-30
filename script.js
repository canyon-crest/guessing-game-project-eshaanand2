// global variables
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
date.textContent = time();

// event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);

function play(){

}
function makeGuess(){

}
function reset(){

}
function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b);
    let lb=document.getElementsByName("leaderboard");

    wins.textContent="Total wins: "+scoreArr.length;
    let sum = 0;
    for(let i=0;i<scoreArr.length;i++){
        sum+=scoreArr[i];
        if(i<lb.length){
            lb[i].textContent=scoreArr[i];
        }
    }
    let avg=sum/scoreArr.length;
    avgScore.textContent="Average Score: "+avg.toFixed(2);
}
function time(){
    let d=new Date();
    // concatenate a string with all the date info
    return d;
}