// On page load or when start button is clicked:
//     direct to index page
//     Counter starts decreasing by one
//     First Question is displayed
$(document).ready(function() {
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

  // **BUG** ADDS 2 TO CORRECT/WRONG ANSWERS ON FIRST CLICK
  // CHECK FOR RANDOM QUESTION ALREADY BEING USED
  // INPUT FOR USERS INITIALS THEN
  // SUBMIT SETS HIGHSCORE TO LOCAL STORAGE
  // GET SCORES FROM LOCAL STORAGE AND APPENDS LI'S ON HIGHSCORE PAGE

  var wrongAnswers = 0;
  var correctAnswers = 0;
  var score = 0;
  var storedQuestions = [];
  var currentIndex = 0;
  var counter = questions.length * 15;
  var correctDisp = $(".correct").hide();
  var wrongDisp = $(".wrong").hide();
  var questCont = $("#questions").hide();
  var finalCont = $("#finalScore").hide();
  var highCont = $("#high-score").hide();

  function scoreList(){
    for(var i = 0;i < localStorage.length;i ++) {
      var highscore = JSON.parse(localStorage.getItem(localStorage.key(i)));
      var listItem = $("<li>");
      listItem.addClass("list");
      listItem.text(highscore);
      $("#scoreBoard").append(listItem);
    }
  }
// FUNCTION TO CLEAR SCOREBOARD(INCLUDING LOCALSTORAGE)
  function clearScore(){
    $("#clear").on("click", function(){
      localStorage.clear();
      $(".list").remove();
    });
  }
  

  // HIGHSCORES LINK
  function scoreLink(){
    $("#highScore").on("click", function(){
      questCont.hide();
      finalCont.hide();
      highCont.show();
      countDown();
      counter = 100001;
    });
  }

  // SUBMITTING SCORE TO LOCAL STORAGE
  function localStore() {
    $("#form").submit(function() {
      event.preventDefault();
      finalCont.hide();
      highCont.show();
      var input = $("#initials").val().trim();
      console.log(input);
      localStorage.setItem(input, score);
    });
  }

  // HANDLING COMPLETED QUIZ
  function complete() {
    console.log(`storedQuestions: ${storedQuestions.length} questions: ${questions.length}`);
    console.log(storedQuestions.length === questions.length);
    if (storedQuestions.length === questions.length) {
      counter = 0;
      score = correctAnswers * 5;
      $("#score").text(score);
      $("#finalMsg").text("You're finished!!")
      questCont.hide();
        finalCont.show();
      console.log("Question array " + storedQuestions);
    }
  }

  // COUNTDOWN FUNCTION
  function countDown() {
    var interval = setInterval(function() {
      $("#counter").text(counter);
      counter--;
      if (counter <= -1) {
        clearInterval(interval);
        score = correctAnswers * 5;
        $("#score").text(score);
        $("#finalMsg").text("You ran out of time ...")
        questCont.hide();
        finalCont.show();
        // $(location).attr("href", "finalScore.html");
        // CREATIVLY GOT RID OF COUNTER FOR HIGHSCORES LINK
      } else if(counter == 100000){
        clearInterval(interval);
        $("#counter").hide();
      } else {
        return;
      }
    }, 1000);
  }

  // FUNCTION CLEARING APPENDED ELEMENTS
  function clear() {
    setTimeout(function() {
      $("#questList").empty();
      genQuest();
    }, 2000);
  }

  // FUNCTION TO CHECK IF ANSWER IS CORRECT
  function checkAnswer() {
    $(".options").on("click", function() {
      var data = $(this).attr("data-word");
      // UNBINDING CLICK SO YOU CANT CLICK ANYMORE
      $(".options").unbind();
      if (data === questions[currentIndex].answer) {
        // SHOW CORRECT H3
        correctDisp.show();
        correctAnswers++;
        console.log(score);
        localStore();
        console.log("crrect " + correctAnswers);
        clear();
      } else {
        // SUBTRACT 5 SECS FOR WRONG ANSWER
        counter -= 5;
        // SHOW WRONG H3
        wrongDisp.show();
        wrongAnswers++;
        console.log("wrng " + wrongAnswers);
        clear();
      }
    });
  }

  // FUNCTION GENERATING RANDOM QUESTION
  function genQuest() {
    correctDisp.hide();
    wrongDisp.hide();
    var RandQuest = Math.floor(Math.random() * Math.floor(questions.length));
    var choiceLength = questions[RandQuest].choices.length;
    for (let i = 0; i < choiceLength; i++) {
      var choiceLst = $("<li>");
      var choiceBtn = $("<button>");
      choiceBtn.addClass("options buttons btn btn-dark");
      choiceBtn.attr("data-word", questions[RandQuest].choices[i]);
      choiceBtn.text(questions[RandQuest].choices[i]);
      // CREATING BUTTON INSIDE OF A CREATED LI
      $("#questList").append($(choiceLst).append(choiceBtn));
    }
    // DISPLAYING QUESTION TO INDEX.HTML
    $("#questionDisp").text(questions[RandQuest].title);

    console.log(storedQuestions);
    currentIndex = RandQuest;
    // PUSHING PAST QUESTIONS TO AN ARRAY
    storedQuestions.push(RandQuest);
    checkAnswer();
    complete();
  }

  // function start(){
    // $("#start").on("click", function(){
      genQuest();
  //   });
  // }

  function init() {
    score = 0;
    storedQuestions = [];
    currentIndex = 0;
    questCont.show();
    // start();
  }

  // checkAnswer();

  init();
  countDown();
  localStore();
  scoreLink();
  clearScore();
  scoreList();
  
  
  
});
// console.log(questions[3].answer);
