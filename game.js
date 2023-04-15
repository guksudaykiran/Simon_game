var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var start = false;


$(document).keypress(function() {

  if(!start){
    $("h1").text("level " + level);
    nextSequence();
    start = true;
  }

});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  animatePress(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      var gameEndSound = new Audio("sounds/wrong.mp3");
      gameEndSound.play();

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart");

      startOver();

    }

}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}
