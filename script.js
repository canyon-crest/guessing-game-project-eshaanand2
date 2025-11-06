// global variables
let level, answer, score, gameStart, roundTimerInterval, gameTimerInterval, gameTime, gameSec;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
const timeArr = [];
date.textContent = time();

// event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
nameBtn.addEventListener("click",greeting)
giveUp.addEventListener("click", giveUpGame)

function greeting(){
    nameInput=document.getElementById("nameInput").value;
    capName=nameInput.charAt(0).toUpperCase()+nameInput.slice(1).toLowerCase();
    let welcome="Welcome to the guessing game, "+capName+"!";
    nameOutput.textContent=welcome;
}

function play(){
    score=0;
    playBtn.disabled=true;
    guessBtn.disabled=false;
    giveUp.disabled=false;
    guess.disabled=false;
    gameStart = Date.now();
    displayRoundTimer();
    displayGameTimer();
    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){
            level=levelArr[i].value;
        }
        levelArr[i].disabled=true;
  }
    msg.textContent="Guess a number from 1-"+level;
    answer=Math.floor(Math.random()*level)+1;
    // guess.placeholder=answer;
}

function makeGuess(){
    let scoreMsg;
    let userGuess=parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent="Enter a VALID #1-" + level;
        return;
    }
    score++;
    if(score==1){
        scoreMsg="That's a great score!"
    }
    else if(score<5){
        scoreMsg="That's a good score."
    }
    else if(score<10){
        scoreMsg="That's an okay score."
    }
    else{
        scoreMsg="Not the best score."
    }
    if(userGuess < answer){
        msg.textContent="Too low, try again";
    }
    else if(userGuess > answer){
        msg.textContent="Too high, try again";
    }
    else{
        msg.textContent="You got it! It took you " + score + " tries. "+scoreMsg+" Press play to play again.";
        updateScore();
        reset(); 
    }
    let diff=Math.abs(userGuess-answer);
    if(userGuess!=answer){
        if(diff<5){
            msg.textContent+=". You are hot!"
        }
        else if((level==3||level==10) & diff>5){
            msg.textContent+=". You are cold."
        }
        else if(diff<10){
            msg.textContent+=". You are very warm!"
        }
        else if(diff<25){
            msg.textContent+=". You are warm!"
        }
        else if(diff<40){
            msg.textContent+=". You are a little warm."
        }
        else{
            msg.textContent+=". You are cold."
        }
    }
}

function giveUpGame(){
    msg.textContent="You gave up. The answer was "+answer+"."
    score=level;
    updateScore();
    setTimeout(reset, 100);
}

function displayRoundTimer(){
    clearInterval(roundTimerInterval);
    roundTimerInterval=setInterval(()=>{
        const currentGameTime=Date.now();
        const elapsedTime=currentGameTime - gameStart;
        
        gameSec=Math.floor(elapsedTime/1000);
        const gameMin=Math.floor(gameSec/60);
        let displayedSec=gameSec%60;
        if(displayedSec<10){
            displayedSec = "0"+displayedSec;
        }
        gameTime=gameMin+":"+displayedSec;
        document.getElementById("showRoundTimer").textContent="Time Elapsed for Round: "+gameTime;
    }, 1000)
}

function displayGameTimer(){
    if(gameTimerInterval){
        return;
    }
    const gameStartTime=Date.now();

    gameTimerInterval=setInterval(()=>{
        const elapsedTime=Date.now() - gameStartTime;

        gameSec=Math.floor(elapsedTime/1000);
        const gameMin=Math.floor(gameSec/60);
        let displayedSec=gameSec%60;
        if(displayedSec<10){
            displayedSec = "0"+displayedSec;
        }
        gameTime=gameMin+":"+displayedSec;
        document.getElementById("showGameTimer").textContent="Time Elapsed for Game: "+gameTime;
    }, 1000)
}

function reset(){
    guessBtn.disabled=true;
    guess.disabled=true;
    guess.value="";
    guess.placeholder="";
    playBtn.disabled=false;
    clearInterval(roundTimerInterval);
    document.getElementById("showRoundTimer").textContent="Time Elapsed for Round: 0:00";
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = false;
    }
}

function updateScore(){
    scoreArr.push(score);
    scoreArr.sort((a,b)=>a-b);
    let lb=document.getElementsByName("leaderboard");
    wins.textContent="Total wins: "+scoreArr.length;
    let sumWins=0;
    for(let i=0;i<scoreArr.length;i++){
        sumWins+=scoreArr[i];
        if(i<lb.length){
            lb[i].textContent=scoreArr[i];
        }
    }
    let avgSc=sumWins/scoreArr.length;
    avgScore.textContent="Average Score: "+avgSc.toFixed(2);

    timeArr.push(gameSec);
    timeArr.sort((a,b)=>a-b);
    let fastGameT=timeArr[0];
    let fastGameMin=Math.floor(fastGameT/60);
    let fastGameSec=Math.floor(fastGameT%60);
    if(fastGameSec<10){
        fastGameSec="0"+fastGameSec;
    }
    fastestGame.textContent="Fastest Game: "+fastGameMin+":"+fastGameSec;

    let sumT=0;
    for(let i=0;i<timeArr.length;i++){
        sumT+=timeArr[i];
    }
    let avgT=sumT/timeArr.length;
    let avgMin=Math.floor(avgT/60)
    let avgSec=Math.floor(avgT%60)
    if(avgSec<10){
        avgSec="0"+avgSec;
    }
    avgTime.textContent="Average Time per Game: "+avgMin+":"+avgSec;
}

function time(){
    let d=new Date();
    const daysOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day=daysOfWeek[d.getDay()];

    const monthsOfYear=["January","February","March","April","May","June","July","August","September","October","November","December"]
    month=monthsOfYear[d.getMonth()];
    
    currentDate=d.getDate();
    if(currentDate%10==1 && currentDate!=11){
        currentDate+="st"
    }
    else if(currentDate%10==2 && currentDate!=12){
        currentDate+="nd"
    }
    else if(currentDate%10==3 && currentDate!=13){
        currentDate+="rd"
    }
    else{
        currentDate+="th"
    }

    let year=d.getFullYear();
    
    let minutes=d.getMinutes();
    if(minutes<10){
        minutes="0"+minutes;
    }
    
    let seconds=d.getSeconds();
    if(seconds<10){
        seconds="0"+seconds;
    }

    currentTime=d.getHours()+":"+minutes+":"+seconds;
    
    calendar = "Today is "+day+", "+month+" "+currentDate+", "+year+". The time is "+currentTime+".";
    date.textContent=calendar;
}
time()
setInterval(time, 1000);