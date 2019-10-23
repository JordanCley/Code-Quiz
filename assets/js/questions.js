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
var storedQuestions = [];
var currentIndex = 0;

// FUNCTION TO CHECK IF ANSWER IS CORRECT
function checkAnswer() {
  $(".options").on("click", function() {
    var data = $(this).attr("data-word");
    console.log(data);
    if (data === questions[currentIndex].answer) {
      // TOGGLING CORRECT
      $(".correct").toggle(genQuest);
    } else {
      // TOGGLING WRONG (GENQUEST NOT WORKING AND NOT TOGGLING BACK OFF)
      $(".wrong").toggle(genQuest);
    }
  });
}

// FUNCTION GENERATING RANDOM QUESTION
function genQuest() {
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
}

genQuest();
checkAnswer();
// console.log("current " + currentIndex);
// console.log(storedQuestions);

// console.log(questions[3].answer);
