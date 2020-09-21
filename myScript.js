// define game variables
const totalGames = 5;
let userScore = 0;
let computerScore = 0;
let gameNumber = 1; 




// Randomly chooses rock, paper, or scissors 
//input: none
//output: [str] rock, paper, or scissors
function getComputerPlay(){
	plays = ["rock", "paper", "scissors"];
	choice = Math.floor(Math.random() * 3);
	return(plays[choice]);
}

// Increase score of winner (or do nothing if tie) 
//input: [str] winner,[int] userScore,[int] computerScore
//output: [int] userScore, computerScore 
function updateScores(winner, userScore, computerScore){
	if (winner === "user"){
		userScore++;
	}
	else if (winner === "computer"){
		computerScore++;
	}
	return {
		updatedUserScore: userScore,
		updatedComputerScore: computerScore,
	};
}

// Displays the scores given to console
//input: [int] userScore, computerScore
//output: none
function displayScores(userScore, computerScore){
	userScoreDisplay.textContent = `Player: ${userScore}`;
	computerScoreDisplay.textContent = `Computer: ${computerScore}`;
	return; 
}

// diplay the current round's plays
//input: [str] the user and computers' plays, and the round winner
//output: none
function displayRound(userPlay, computerPlay, winner){
	/*display.textContent = `
	player: ${userPlay} \r\n 
	computer: ${computerPlay} \r\n 
	winner: ${winner}`;*/
	display.innerHTML = 
	`player: ${userPlay}  
	<br><br> 
	computer: ${computerPlay}  
	<br><br> 
	winner: ${winner}`;
	return;
}

// Displays the winner given scores
//input: [int] userScore, computerScore
//output: none, console logs winner
function displayWinner(userScore, computerScore){
	if (userScore > computerScore){
		display.textContent = "You Win!";
	}
	else if (userScore < computerScore){
		display.textContent = "Computer Wins!";
	}
	else{
		display.textContent = "TIE!";
	}
}

// Plays a single round of rock, paper, scissors
//input: [str] the player selection and the computer selection
//output: [str] winner  
function playRound(userSelection, computerSelection){
	//if same, return tie
	if (userSelection === computerSelection){
		return("tie");
	}
	//if computer is rock
	else if (computerSelection === "rock"){
		if (userSelection === "paper") {return("user")} //user is paper, PLAYER  WIN
		else if (userSelection === "scissors"){return("computer")} //user is scissors, COMPUTER WIN
	}

	//if computer is paper
	else if (computerSelection === "paper"){
		if (userSelection === "rock") { return("computer")} //if user is rock, COMPUTER WIN 
		else if (userSelection === "scissors"){return("user")} //if user is scissors, PLAYER WIN
	}
	//if computer is scissor
	else{
		if (userSelection === "rock") {return("user")} //if user is rock, PLAYER WIN 
		else if (userSelection === "paper") {return("computer")} //if user is paper, COMPUTER WIN
	}
}


function btnClick(e){
	console.log(this);
	this.classList.add("pressed");
	console.log(this);
	//checkgame number
	if (gameNumber < totalGames){
		let computerPlay = getComputerPlay();
		let userPlay = e.target.id;
		let winner = playRound(userPlay, computerPlay);
		//update round display
		displayRound(userPlay, computerPlay, winner);
		//update scores
		let updatedScores = updateScores(winner, userScore, computerScore);
		userScore = updatedScores.updatedUserScore;
		computerScore = updatedScores.updatedComputerScore;
		//displayScores and game number
		displayScores(userScore, computerScore);
		gameNumber++;
		gameNumberDisplay.textContent = `Game: ${gameNumber}`;
	}
	//reached end of game
	else{
		displayWinner(userScore, computerScore);
	}
}

function removeTransition(e){
	if(e.propertyName !== "transform") return;
	this.classList.remove("pressed");
}


const display = document.querySelector("#display");
const gameNumberDisplay = document.querySelector("#gameNumberDisplay");
const userScoreDisplay = document.querySelector("#userScoreDisplay");
const computerScoreDisplay = document.querySelector("#computerScoreDisplay");
const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", btnClick));
buttons.forEach(button => button.addEventListener("transitionend", removeTransition));


