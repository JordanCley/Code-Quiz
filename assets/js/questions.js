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

  var wrongAnswers    = 0,
      correctAnswers  = 0,
      score           = 0,
      storedQuestions = [],
      currentIndex    = 0,
      counter         = questions.length * 15,
      correctDisp     = $(".correct").hide(),
      wrongDisp       = $(".wrong").hide(),
      landingCont     = $("#landing").hide(),
      questCont       = $("#questions").hide(),
      finalCont       = $("#finalScore").hide(),
      navCont         = $("#nav").hide(),
      highCont        = $("#high-score").hide();

  function start() {
    landingCont.show();
    $("#start").on("click", function() {
      navCont.show();
      genQuest();
      countDown();
      localStore();
      clearScore();
    });
  }

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
      scoreList();
      landingCont.hide();
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
      scoreList();
    });
  }

  // HANDLING COMPLETED QUIZ
  function complete() {
    // console.log("stored " + storedQuestions);
    // console.log("current " + currentIndex);
    if (storedQuestions.length === questions.length + 1) {
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

  // ********* THINGS LEFT/BUGS*********
  // CHECK FOR RANDOM QUESTION ALREADY BEING USED
  // SORT() HIGHSCORES 

  function checkQuest(){
    for(var i = 0;i < storedQuestions.length - 1;i ++){
      console.log("stored Questions ondex: " + storedQuestions[i]);
      console.log("questions index: " + currentIndex);
      console.log(storedQuestions[i] === currentIndex);

      // COMPARING STORED QUESTIONS ARRAY TO THE 
      // CURRENT INDEX SELECTED OF QUESTIONS ARRAY 

      if(storedQuestions[i] === currentIndex){
      //  ******* DO SOMETHING TO GENERATE NEW QUESTION????? *******
      }
    }
    
  }

  // FUNCTION GENERATING RANDOM QUESTION
  function genQuest() {
    questCont.show();
    landingCont.hide();
    correctDisp.hide();
    wrongDisp.hide();
    var RandQuest = Math.floor(Math.random() * Math.floor(questions.length));
    // PUSHING PAST QUESTIONS TO AN ARRAY
    storedQuestions.push(RandQuest);
    
      // console.log("past index: " + pastIndex);
    var choiceLength = questions[RandQuest].choices.length;
    currentIndex = RandQuest;
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
    checkAnswer();
    if (correctAnswers > 0 || wrongAnswers > 0) {
      // pastIndex = storedQuestions.length - 1;
      checkQuest();
    }
    complete();
  }

  function init() {
    score = 0;
    storedQuestions = [];
    currentIndex = 0;
    scoreLink();
    start();
  }

  init();
});
