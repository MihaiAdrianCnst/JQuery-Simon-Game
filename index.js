var buttonsColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPatern = [];
var isStarted = false;
var level = 0;

$("h1").text("Press A Key to Start");

$(".btn").on('click', function(event) {
  var userChosenColor = $(event.target).attr("id");
  userClickPatern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if(isStarted)
  {
  checkAnswer(level);
}
});

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(
    function() {
      $("." + currentColor).removeClass("pressed");
    }, 250);
}

$(document).keydown(function(event) {
  if (isStarted === true) {
    return;
  }
  $("body").removeClass('game-over')
  isStarted = true;
  nextSequence();
});

$(".start").click(function(event) {
  if (isStarted === true) {
    return;
  }
  $("body").removeClass('game-over')
  isStarted = true;
  nextSequence();
});

function checkAnswer(currentLevel) {

console.log(gamePattern);
console.log(userClickPatern);

  var isCorrect = true;
  for (var i = 0; i < userClickPatern.length; i++) {
    if (gamePattern[i] !== userClickPatern[i]) {
      isCorrect = false;
    }
  }
console.log(isCorrect);
  if (isCorrect) {
    if (userClickPatern.length === currentLevel) {
      setTimeout(
        function() {
          nextSequence();
        }, 1000);
    }

  } else {
    $("body").addClass('game-over');
    $("h1").text("Game Over");
    isStarted = false;
    userClickPatern = [];
    gamePattern = [];
    level = 0;
  }

}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonsColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("." + randomChosenColor).fadeOut(50).fadeIn(50);
  playSound(randomChosenColor);
  userClickPatern = [];
}
