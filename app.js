/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to
his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score.
After that, it's the next player's turn
- The first player to reach 100 points on GLOBALscore wins the game

*/

// Setting multiple variables as undefined
var scores, roundScore, activePlayer, gamePlaying, finalScore;
// init the game
resetGame();

// Setting the click action for roll dice
document.querySelector('.btn-roll').addEventListener('click', function() {
  // check if game is playing
  if(gamePlaying) {
    // 1. Random dice number for both dices
    var diceOne = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;
    // 2. Display the result
    var diceDOMOne = document.querySelector('.dice');
    var diceDOMTwo = document.querySelector('.dice-two');
    // lock player DOM
    var playerDOM = document.querySelector('#current-' + activePlayer);
    // display both dices
    diceDOMOne.style.display = 'block';
    diceDOMTwo.style.display = 'block';
    // set the dice pictures
    diceDOMOne.src = `dice-${diceOne}.png`;
    diceDOMTwo.src = `dice-${diceTwo}.png`;


    // 3. Evaluate if both dices aren't six
    if (diceOne === 6 && diceTwo === 6) {
      // set the player score to 0
      scores[activePlayer] = 0
      // update the UI
      document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
      // switch player
      switchPlayer();
    // 4. Evalute if any of the dices is different from 1
    } else if (diceOne !== 1 && diceTwo !== 1) {
      // update the current score
      roundScore += diceOne + diceTwo
      // update the UI current score
      playerDOM.textContent = roundScore;
    // 5. if none of the conditions before are met
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Setting the click action for hold
document.querySelector('.btn-hold').addEventListener('click', function() {
  // check if game is playing
  if (gamePlaying) {
    // Transfer the current score into Player Score
    scores[activePlayer] += roundScore;
    // update the UI for global score
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= finalScore.value) {
      // set the player text into winner
      document.getElementById(`name-${activePlayer}`).textContent = 'Winner!'
      // hide the dices
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice-two').style.display = 'none';
      // add the css winner class
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      // kill the active class
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      // set the state variable to false
      gamePlaying = false;
    } else {
      // next player
        switchPlayer();
    }
  }
});

function switchPlayer() {
  // switch to the next player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  // set the score back to zero
  roundScore = 0;
  // reset the current score if the roll is 1
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // adding the toggle functionality for better UX
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // Hide the dice if the result is 1 for better UX
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-two').style.display = 'none';
}

function resetGame() {
  // reset global scores
  scores = [0, 0];
  // reset player to 1
  activePlayer = 0;
  // reset current Scores
  roundScore = 0;
  // state variable
  gamePlaying = true;


  // Set the final score variable!
  finalScore = document.querySelector('.final-score')
  // Tell the user to set the score that requires to end the game!
  finalScore.value = prompt('Please set the final game score! :D');
  // Hide the dices images at the start of the game
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice-two').style.display = 'none';
  // Setting the score as 0 for both players when the game starts
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  // Setting the current score as 0 for both players when the game starts
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  // restart the names
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  // remove the winnerclass
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  // remove the activeclass
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  // add the activeclass to player 0
  document.querySelector('.player-0-panel').classList.add('active');
}

// setting the click action for new game
document.querySelector('.btn-new').addEventListener('click', resetGame);

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row.
After that, it's the next player's turn. (Hint: Always save the previous
dice roll in a separate variable)


2. Add an input field to the HTML where players can set the winning score,
so that they can change the predefined score of 100. (Hint: you can read
that value with the .value property in JavaScript. This is a good
oportunity to use google to figure this out :)


3. Add another dice to the game, so that there are two dices now.
The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice, so take a look
at the CSS code for the first one.)
*/
