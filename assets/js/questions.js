// On page load or when start button is clicked:
//     direct to index page
//     Counter starts decreasing by one
//     First Question is displayed

let questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    title: "I need to find more questions",
    choices: ["yea", "no", "California", "numbers"],
    answer: "California"
  },
  {
    title: "blah blah balh blah",
    choices: ["1", "2", "Jordan", "4"],
    answer: "Jordan"
  },
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "Indiana", "alerts", "numbers"],
    answer: "Indiana"
  }
];

// TRACK HOW MANY CORRECT ANSWERS
// CALCULATE SCORE (5 POINTS PER CORRECT ANSWER)
// INPUT FOR USERS INITIALS
// SUBMIT PUSHES HIGHSCORE TO LOCAL STORAGE
// LOCAL STORAGE APPENDS ELEMENTS IN LIST


var storedQuestions = [];
var currentIndex = 0;
var counter = questions.length * 15;
var correct = $(".correct").hide();
var wrong = $(".wrong").hide();

// COUNTDOWN FUNCTION
function countDown() {
  var interval = setInterval(function() {
    $("#counter").text(counter);
    counter--;
    if (counter <= -1) {
      $("#finalMsg").text("Out of time...");
      clearInterval(interval);
      $(location).attr("href", "finalScore.html");
    }
  }, 1000);
}

// FUNCTION CLEARING APPENDED ELEMENTS
function clear(){
  setTimeout(function(){
    $("#questList").empty();
    genQuest();
  }, 2000);
}

// FUNCTION TO CHECK IF ANSWER IS CORRECT
function checkAnswer() {
  $(".options").on("click", function() {
    var data = $(this).attr("data-word");
    console.log(data);
    if (data === questions[currentIndex].answer) {
      // TOGGLING CORRECT
      correct.show();
      clear();
    } else {
      // SUBTRACT 5 SECS FOR WRONG ANSWER
      counter -= 5;
      wrong.show();
      clear();
      // TOGGLING WRONG (GENQUEST NOT WORKING AND NOT TOGGLING BACK OFF)
    }
  });
}

// FUNCTION GENERATING RANDOM QUESTION
function genQuest() {
  correct.hide();
  wrong.hide();
  var RandQuest = Math.floor(Math.random() * Math.floor(questions.length));
  var choiceLength = questions[RandQuest].choices.length;
  for (let i = 0; i < choiceLength; i++) {
    var choiceLst = $("<li>");
    var choiceBtn = $("<button>");
    choiceBtn.addClass("options");
    choiceBtn.attr("data-word", questions[RandQuest].choices[i]);
    choiceBtn.text(questions[RandQuest].choices[i]);
    // CREATING BUTTON INSIDE OF A CREATED LI
    $("#questList").append($(choiceLst).append(choiceBtn));
  }
  // DISPLAYING QUESTION TO INDEX.HTML
  $("#questionDisp").text(questions[RandQuest].title);
  // PUSHING PAST QUESTIONS TO AN ARRAY
  storedQuestions.push(RandQuest);
  currentIndex = RandQuest;
  checkAnswer();
}


$(document).ready(function() {
  genQuest();
  checkAnswer();
  countDown();
});
// console.log(questions[3].answer);
