var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}

});


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

  playSound(userChosenColour);

  animatePress(userChosenColour);

});


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() *4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

}



function playSound(name) {

  $("#" + name).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function animate() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]==gamePattern[currentLevel]){

      if (userClickedPattern.length==gamePattern.length){

          setTimeout(function (){
            nextSequence()
          },1000);

      }
  }
  else{
    var sound = new Audio("sounds/wrong.mp3");
    sound.play();
      $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
  }
}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
