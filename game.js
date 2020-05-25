var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
var flag=0;


function nextSequence(){
  level++;
  $("#level-title").text("Level "+level);
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playmusic(randomChosenColour);
}

function playmusic(currentcolor){
  var audio=new Audio("sounds/"+currentcolor+".mp3");
  audio.play();
}


$(".btn").click(function (){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playmusic(userChosenColor);
  animatePress(userChosenColor);
  var lastIndex=userClickedPattern.length-1;
  checkAnswer(lastIndex);
});


function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
      $("."+currentColour).removeClass("pressed");
  },100);

}


$("body").on("keydown",function(){
    if(started === false){
      $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      if(gamePattern.length === userClickedPattern.length){
        setTimeout(function (){
          nextSequence();
        },1000);
      }
    }else{
        playmusic("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
          $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
      }
}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
