var readlineSync = require('readline-sync');


function getRandomArbitrary(min,max) {
  return Math.round(Math.random() * (max - min) +min);
};


// ----------- Class Player -----------

var Player = (function(){
  var id = 0;
  return function(){
    this.name = "";
    this.points = 0;
    this.id = ++id;
  }
})();

Player.prototype.askName = function(){
  var playerName = readlineSync.question("\n Please enter the name of the player: ");
  console.log('Hi ' + playerName + '! Welcome to the Quiz Show!!\n');
  this.name = playerName;
}

// --------- Class Question ---------

var Question = (function(){
    var id = 0;
    return function(quest, answer){
      this.quest = quest;
      this.answer = answer.toUpperCase();
      this.id = ++id;
      this.pointsValue = getRandomArbitrary(5,10);
    }
})();

Question.prototype.correct = function(answerUser){
  if( answerUser.toUpperCase() === this.answer){
    return true;
  } else{
    return false;
  }
}

Question.prototype.showQuest = function(){
  return this.quest
}


// --------- Class Quiz ---------

var Quiz = function(){
  this.questions_arr = [];
  this.players_arr = [];
}

Quiz.prototype.enterPlayer = function(player){
  this.players_arr.push(player);
}

Quiz.prototype.enterPlayers = function(){
  var morePlayers = true;
  while( morePlayers === true){
    var player = new Player();
    player.askName();
    this.enterPlayer(player);
   
    var newPlayer = readlineSync.question("Do you want to introduce more players?(Y/N)");
    if( newPlayer.toUpperCase() === "N"){
      morePlayers = false;
    }    
  }
}

Quiz.prototype.enterQuestion = function(newQuestion){
  this.questions_arr.push(newQuestion);
}

Quiz.prototype.benefitOfCorrectAnswer = function(player, quiz, quizRandom){
    console.log("Yes! The answer is right!!\n");
    player.points = player.points + quiz.pointsValue;
    this.questions_arr.splice( quizRandom, 1);
}

Quiz.prototype.wrongAnswer = function(player,quiz){
    console.log("WROOONGG!! Try again.\n")
    this.show(this.players_arr[player.id ], quiz);
}

Quiz.prototype.showPoints = function(){
  this.players_arr.forEach( function( player) {
    console.log(player.name + ". Your points are: " + player.points + " points");
  });
}


Quiz.prototype.show = function(player, quiz){
  if( player === undefined){
    var player = this.players_arr[0];
  }

  if( quiz === undefined) {
    var quizRandom = getRandomArbitrary(0, this.questions_arr.length - 1)
    var quiz = this.questions_arr[ quizRandom ];
  }
  console.log("Hello " + player.name + " contest the question:");


  var userAnswer = readlineSync.question( quiz.quest);


  if( quiz.correct(userAnswer)){
    this.benefitOfCorrectAnswer( player, quiz, quizRandom );
  }else{
    this.wrongAnswer(player,quiz);
  }


  if( this.questions_arr.length != 0){
    this.show( this.players_arr[ player.id - 1 ]);
  }

  this.showPoints();
  console.log("\nGood Game! You are the best player! Game Over"); 
  
}



// --------- The Show ------------

var quiz = new Quiz();
quiz.enterPlayers();
var quest0 = new Question("What is the name of the creator of JavaScript? ", "Brendan Eich");
var quest1 = new Question("When was born Ruby? ", "1993");
var quest2 = new Question("What is the meaning of HTML? ", "HyperText Markup Language");
var quest3 = new Question("Is Fer the best teacher in programming?(Yes/No) ", "Yes");

quiz.enterQuestion(quest0);
quiz.enterQuestion(quest1);
quiz.enterQuestion(quest2);
quiz.enterQuestion(quest3);
quiz.show();

