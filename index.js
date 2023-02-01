var sequence = [];
var humanSequence = [];

var level=0;

var startBtn = document.querySelector(".startButton");
var info = document.querySelector(".info");
var container = document.querySelector(".tilesContainer");

var redButton = document.querySelector("#red");
var blueButton = document.querySelector("#blue");
var yellowButton = document.querySelector("#yellow");
var greenButton = document.querySelector("#green");

var buttons = ['red', 'blue', 'yellow', 'green'];

redButton.addEventListener('click', handleClick);
yellowButton.addEventListener('click', handleClick);
blueButton.addEventListener('click', handleClick);
greenButton.addEventListener('click', handleClick);

startBtn.addEventListener('click', startGame);

function startGame()
{
    startBtn.classList.add("hidden");
    info.innerHTML="level 1";
    setTimeout(nextSequence,600);
}

function nextSequence()
{
    level+=1;
    var nextColor = buttons[Math.floor(Math.random()*4)];
    sequence.push(nextColor);
    playGame();
}

function playGame()
{
    container.classList.add("noClick");
    info.innerHTML="wait for the computer...";
    sequence.forEach(
        (color, index)=>{
            setTimeout(()=>{buttonClickAnimation(color);}, (index+1)*650);
        }
    )
    setTimeout(()=>{playerTurn();},level*650+1000);
}

function buttonClickAnimation(clickedButton)
{
    var activatedButton = document.querySelector("#"+clickedButton);
    var sound = document.querySelector("."+clickedButton+"Sound");
    sound.play();
    activatedButton.classList.remove(clickedButton+"Deactivated")
    activatedButton.classList.add(clickedButton+"Activated");
    setTimeout(
        function(){
        activatedButton.classList.remove(clickedButton+"Activated")
        activatedButton.classList.add(clickedButton+"Deactivated")},
        300
    );
}

function playerTurn(level)
{
    container.classList.remove("noClick");
    info.innerHTML="Your turn...";
}

function handleClick()
{
    humanSequence.push(this.classList[1]);
    buttonClickAnimation(this.classList[1]);
    var index = humanSequence.length -1;
    if(humanSequence[index]!=sequence[index]){
        resetGame();
        return;
    }

    if(humanSequence.length==sequence.length)
    {
        humanSequence=[];
        info.innerHTML="Well Done. Keep Going...";
        setTimeout(()=>{info.innerHTML="level "+(level+1)},800);
        setTimeout(()=>{nextSequence();},1600);
        return;
    }
}

function resetGame()
{
    alert("GAME OVER LOL");
    humanSequence=[];
    sequence=[];
    level=0;
    container.classList.add('noClick');
    startBtn.classList.remove('hidden');
    info.innerHTML="";
}


