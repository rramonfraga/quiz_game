var readlineSync = require('readline-sync');






/*
prompt.start();

function getPrompt(){
  var answer = "";
  answer = prompt.get(['answer'], function (err, result) {
    console.log('Command-line input received:');
    console.log('  answer: ' + result.username);
    console.log('Quieres hacer ');
  });

  return answer;
}*/

function getRandomArbitrary(min,max) {
  return Math.round(Math.random() * (max - min) +min);
};


// --------- Class Question ---------

var Question = function(quest, answer){
  this.quest = quest;
  this.answer = answer.toUpperCase();
  this.id = 0;
}

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
  this.players = [];
}

Quiz.prototype.enterUser = function(userName){
  this.players.push(userName);
}

Quiz.prototype.enterPlayers = function(){
  var morePlayers = true;
  while( morePlayers === true){
    var userName = readlineSync.question("\n Please enter the name of the player: ");
    this.players.push(userName);
    console.log('Hi ' + userName + '! Welcome to the Quiz Show!!\n');
   
    var newPlayer = readlineSync.question("Do you want to introduce more players?(Y/N)");
    if( newPlayer.toUpperCase() === "N"){
      morePlayers = false;
    }    
  }
}


Quiz.prototype.enterQuestion = function(newQuestion){
  this.questions_arr.push(newQuestion);
}

Quiz.prototype.show = function(quizRandom){
  var end = false
  if( quizRandom === undefined) {
    var quizRandom = getRandomArbitrary(0, this.questions_arr.length - 1);
  }
  var quiz = this.questions_arr[quizRandom];
  var userAnswer = readlineSync.question( quiz.quest);
  if( quiz.correct(userAnswer)){
    console.log("Yes! The answer is right!!\n")
    this.questions_arr.splice(quizRandom, 1);
  }else{
    console.log("WROOONGG!! Try again.\n")
    this.show(quizRandom);
  }

  if( this.questions_arr.length != 0){
    this.show();
  }
  
  console.log("\nGood Game! You are the best player! Game Over"); 
}



var quiz = new Quiz();
quiz.enterPlayers();
var quest0 = new Question("What is the name of the creator of JavaScript?", "Brendan Eich");
var quest1 = new Question("When was born Ruby?", "1993");
var quest2 = new Question("What is the meaning of HTML?", "HyperText Markup Language");
var quest3 = new Question("Is Fer the best teacher in programming?(Yes/No)", "Yes");

quiz.enterQuestion(quest0);
quiz.enterQuestion(quest1);
quiz.enterQuestion(quest2);
quiz.enterQuestion(quest3);
quiz.show();

