// global variables
let level, answer, score;
const levelArr = document.getElementsByName("level");
const scoreArr = [];
date.textContent = time();

// event listeners
playBtn.addEventListener("click",play);
guessBtn.addEventListener("click",makeGuess);
nameBtn.addEventListener("click",greeting)
giveUp.addEventListener("click", giveUpGame)

function greeting(){
    nameInput = document.getElementById("nameInput").value;
    capName = nameInput.charAt(0).toUpperCase()+nameInput.slice(1).toLowerCase();
    let welcome = "Welcome to the guessing game, "+capName+"!";
    nameOutput.textContent=welcome;
}

function play(){
    score = 0; // sets score to 0 every new game
    playBtn.disabled = true;
    guessBtn.disabled = false;
    giveUp.disabled = false;
    guess.disabled = false;
    for(let i=0; i<levelArr.length; i++){
        if(levelArr[i].checked){
            level = levelArr[i].value;
        }
        levelArr[i].disabled = true;
  }
    msg.textContent = "Guess a number from 1-" + level;
    answer = Math.floor(Math.random()*level)+1;
    guess.placeholder = answer;
}

function makeGuess(){
    let userGuess = parseInt(guess.value);
    if(isNaN(userGuess) || userGuess < 1 || userGuess > level){
        msg.textContent = "Enter a VALID #1-" + level;
        return;
    }
    score ++; // valid guess add 1 to score
    if(userGuess < answer){
        msg.textContent = "Too low, try again";
    }
    else if(userGuess > answer){
        msg.textContent = "Too high, try again";
    }
    else{
        msg.textContent = "You got it! It took you " + score + " tries. Press play to play again";
        updateScore();
        reset();
}
}

function giveUpGame(){
    msg.textContent="You gave up. The answer was "+answer+"."
    score=level;
    updateScore();
    reset();
}

function reset(){
    guessBtn.disabled = true;
    guess.disabled = true;
    guess.value = "";
    guess.placeholder = "";
    playBtn.disabled = false;
    for(let i=0; i<levelArr.length; i++){
        levelArr[i].disabled = false;
    }
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
    const d=new Date();
    let day=d.getDay();
    if(day==0){
        day="Sunday"
    }
    else if(day==1){
        day="Monday"
    }
    else if(day==2){
        day="Tuesday"
    }
    else if(day==3){
        day="Wednesday"
    }
    else if(day==4){
        day="Thursday"
    }
    else if(day==5){
        day="Friday"
    }
    else{
        day="Saturday"
    }

    month=d.getMonth();
    if(month==0){
        month="January"
    }
    else if(month==1){
        month="February"
    }
    else if(month==2){
        month="March"
    }
    else if(month==3){
        month="April"
    }
    else if(month==4){
        month="May"
    }
    else if(month==5){
        month="June"
    }
    else if(month==6){
        month="July"
    }
    else if(month==7){
        month="August"
    }
    else if(month==8){
        month="September"
    }
    else if(month==9){
        month="October"
    }
    else if(month==10){
        month="November"
    }
    else{
        month="December"
    }

    currentDate=d.getDate();
    if(currentDate%10==1 & currentDate!=11){
        currentDate+="st"
    }
    else if(currentDate%10==2 & currentDate!=12){
        currentDate+="nd"
    }
    else if(currentDate%10==3 & currentDate!=13){
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

    const seconds=d.getSeconds();
    if(seconds<10){
        seconds="0"+seconds;
    }

    currentTime=d.getHours()+":"+minutes+":"+seconds;
    
    calendar = "Today is "+day+", "+month+" "+currentDate+", "+year+". The time is "+currentTime+".";
    date.textContent=calendar;
}
setInterval(time, 1000);

function timer(){
    
}