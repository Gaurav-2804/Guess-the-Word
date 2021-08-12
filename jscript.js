const TextToDisplay = 'https://random-word-api.herokuapp.com//word?number=1';
const msg = document.querySelector('.msg');
const guess = document.querySelector('input'); 
const btn = document.querySelector('.btn');
let play = false;
let newWords = "";
let ranWords = "";
let sWords 
let myWord = "";
var ctr = 0;
let tm = false;

let startTime = 0;
function startTimer() {
  startTime = new Date()
  setInterval(() => {
    document.getElementById('timer').innerText = getTimerTime()
  }, 1000)
}
function getTimerTime() {
    if(document.getElementById('timer').innerText<60){
        if(tm==true){
            document.getElementById('timer').style.display = "none";
            clearInterval(startTime)
            tm=false;
            return "Very Good";
        }
        else{
        return Math.floor((new Date() - startTime) / 1000)
        }
    }
    else if(document.getElementById('timer').innerText==60){
        guess.classList.toggle('hidden');
        play = false;
        btn.innerHTML = "Start Again"
        clearInterval(startTime)
        msg.innerHTML = `Corect Word is: ${newWords}`;
        return "Time's Up"
    }
    else{
        play = false;
        return "Time's Up"
    }
}
    

const createNewWords = () => {
    getNextLine();
    console.log(sWords)
    return sWords;
}

const scrambleWords = (arr) => {
    for(let i = arr.length-1; i>0; i--){
        let temp = arr[i];
        let j = Math.floor(Math.random()*(i+1));
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

btn.addEventListener('click',function(){
    msg.classList.remove('correct');
    msg.classList.remove('incorrect');
    
    if(!play){
        document.getElementById('timer').innerText=0;
        startTime = 0;
        startTimer()
        document.getElementById('timer').style.display = "block";
        play = true;
        btn.innerHTML="Guess";
        guess.classList.toggle('hidden');
        newWords = createNewWords();
        //console.log(newWords);
        ranWords = scrambleWords(newWords.split("")).join("");
        msg.innerHTML = `Guess the Word: ${ranWords}`;
    }
    else{
        let tempWords = guess.value;
        if(tempWords === newWords){
            play = false;
            tm=true;
            var img=document.createElement('img');
            img.classList.add('img')
            img.src = './check.png' 
            msg.innerText = `It's correct. It is ${newWords}\n`;
            msg.appendChild(img);
            msg.classList.remove('incorrect');
            msg.classList.add('correct');
            ctr++;
            document.getElementById("counter").innerHTML="CORRECT WORDS: " + ctr;
            btn.innerHTML = "Start Again";
            guess.classList.toggle('hidden');
            guess.value = "";
        }
        else{
            msg.innerText = `Sorry. It's incorrect. Try again ${ranWords}\n`;
            var img=document.createElement('img');
            img.classList.add('img')
            img.src = './wrong.png' 
            msg.appendChild(img);
            msg.classList.add('incorrect');
            guess.value = "";
        }
    }
})
 


function getText() {
    return fetch(TextToDisplay)
    .then(response => response.json())
    .then(data => data[0])
}

async function getNextLine(){
    sWords =  await getText()
    //console.log(FetchedLine)
    
}
getNextLine()

