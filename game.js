var gamePattern = [];
var buttonColors = ["red", "green",  "blue", "yellow"];
var randomChosenColor; 
var userChosenPattern = [];
var level = 0;



playSound();
animatePress();


$('.startBtn').one("click", startGameButton);


function nextSequence (){
     var randomNumber = Math.floor(Math.random()*4);
     randomChosenColor = buttonColors[randomNumber];
     gamePattern.push(randomChosenColor);
     $("#"+randomChosenColor).animate({opacity: 0}, 100).animate({opacity: 1}, 100);
        var audioPlay = new Audio('sounds/'+ randomChosenColor +'.mp3');
        audioPlay.play();
        level++;
        $("h1").html("Level " + level);
    
}

$(".btn").on("click", function(){
    var userChosenColor = $(this).attr("id");
    userChosenPattern.push(userChosenColor);
    console.log(userChosenPattern);
    checkAnswer();
})

function playSound(name){
    $('.btn').click(function(){
        var audioPlayOnClick = new Audio('sounds/'+ $(this).attr("id") +'.mp3');
    audioPlayOnClick.play();
    });
}

function animatePress(currentColor){
    $('.btn').click(function(){
        $(this).addClass("pressed");
        setTimeout(function(){
            $('.btn').removeClass("pressed");
        }, 100);   
    })
}


function startGameButton (){
     gameStarted = false;

    if(gameStarted === false)
    {$(this).addClass("pressed");
    $(this).html(".....");
    nextSequence();
    gameStarted = true;}
    else {
        console.log("game has started");
    }

}

function checkAnswer(){
    var lastChosen = userChosenPattern.length - 1;
    if (userChosenPattern[lastChosen] !== gamePattern[lastChosen]){
        //visual and audio effects on game over
        $('#level-title').text('Game Over');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        }, 500)
        $('.startBtn').removeClass("pressed")
        $('.startBtn').text('Retry');
        $('.startBtn').one("click", startGameButton);
        var wrongSound = new Audio('sounds/wrong.mp3');
        wrongSound.play();

        //resetting game
        gamePattern = [];
        userChosenPattern = [];
        level = 0;

       console.log("wrong");
        
            
    }
   if (JSON.stringify(userChosenPattern) === JSON.stringify(gamePattern) && userChosenPattern.length !==0){
    setTimeout(nextSequence, 1000);
    userChosenPattern = [];  
    console.log("Equal");
   }

}
