$(document).ready(function() {
  var questions = [
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
      title: "JQuery is a ______ for javascript?",
      choices: ["Dictionary", "Library", "Book", "Language"],
      answer: "Library"
    },
    {
      title:
        "Javascript is a _____ language that will allow you to dynamically manipulate the DOM.",
      choices: ["script", "foreign", "hard", "beautiful"],
      answer: "script"
    },
    {
      title: "The $ sign is an indicator that _____ is being used.",
      choices: ["JQuery", "money", "CSS", "Javascript"],
      answer: "JQuery"
    }
  ];

  // ********* THINGS LEFT/BUGS*********
  // CHECK FOR RANDOM QUESTION ALREADY BEING USED
  // SEE USER SCORE IN HIGHSCORES DIRECTLY AFTER SAVING INITIALS
  // CURRENTLY YOU HAVE TO CLICK GO BACK AND THEN CLICK HIGHSCORES
  // ONLY LETS YOU ANSWER 4 OF THE 5 QUESTIONS

  var wrongAnswers  = 0,
    correctAnswers  = 0,
    score           = 0,
    storedQuestions = [],
    currentIndex    = 0,
    counter         = questions.length * 15,
    correctDisp     = $(".correct").hide(),
    wrongDisp       = $(".wrong").hide(),
    questCont       = $("#questions").hide(),
    finalCont       = $("#finalScore").hide(),
    highCont        = $("#high-score").hide();

  // FUNCTION CREATING LIST ITEMS FOR STORED SCORES
  function scoreList() {
    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);
      var highscore = JSON.parse(localStorage.getItem(localStorage.key(i)));
      var listItem = $("<li>");
      listItem.addClass("list");
      listItem.text(key + " : " + highscore);
      $("#scoreBoard").append(listItem);
    }
  }

  // FUNCTION TO CLEAR SCOREBOARD(INCLUDING LOCALSTORAGE)
  function clearScore() {
    $("#clear").on("click", function() {
      localStorage.clear();
      $(".list").remove();
    });
  }

  // HIGHSCORES LINK
  function scoreLink() {
    $("#highScore").on("click", function() {
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
      var input = $("#initials")
        .val()
        .trim();
      console.log(input);
      localStorage.setItem(input, score);
    });
  }

  // HANDLING COMPLETED QUIZ
  function complete() {
    if (storedQuestions.length === questions.length) {
      counter = 100001;
      score = correctAnswers * 5;
      $("#score").text(score);
      $("#finalMsg").text("You're finished!!");
      questCont.hide();
      finalCont.show();
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
        $("#finalMsg").text("You ran out of time ...");
        questCont.hide();
        finalCont.show();
        // CREATIVELY GOT RID OF COUNTER FOR HIGHSCORES LINK
      } else if (counter == 100000) {
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
        localStore();
        clear();
      } else {
        // SUBTRACT 5 SECS FOR WRONG ANSWER
        counter -= 5;
        // SHOW WRONG H3
        wrongDisp.show();
        wrongAnswers++;
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
    currentIndex = RandQuest;
    // PUSHING PAST QUESTIONS TO AN ARRAY
    storedQuestions.push(RandQuest);
    checkAnswer();
    complete();
  }

  function init() {
    score = 0;
    storedQuestions = [];
    currentIndex = 0;
    questCont.show();
  }

  init();
  genQuest();
  countDown();
  localStore();
  scoreLink();
  clearScore();
  scoreList();
});
