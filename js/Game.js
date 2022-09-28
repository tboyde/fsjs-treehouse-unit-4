/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
* Game.js */

//variables that will be used frequently inside of the Game class
const startScreen = document.querySelector('div#overlay');
let gameWon = true; 
let gameLost = false; 

class Game {
    constructor(){
        this.missed = 0; 
        this.phrases = [
            new Phrase (`Let your differences shine`), 
            new Phrase (`No feeling is final`), 
            new Phrase (`Small steps every day`), 
            new Phrase (`Do one brave thing`), 
            new Phrase (`Sometimes you get stuck`), 
            new Phrase(`Be original`)
        ]; 
        this.activePhrase = null; 
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
   getRandomPhrase (){
        let ranPhrase = this.phrases[Math.floor(Math.random() * this.phrases.length)]; 
        return ranPhrase; 
   }
    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame(){
        startScreen.style.display = 'none'; 

        this.activePhrase = this.getRandomPhrase(); 
        this.activePhrase.addPhraseToDisplay(); 
        console.log(this.activePhrase); 
    };
    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife(){
        const livesLeft = document.querySelectorAll('li.tries');

        if (this.missed < 4){
            livesLeft[this.missed].innerHTML = `<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">`; 
            this.missed +=1; 
        } else {
            livesLeft[this.missed].innerHTML = `<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">`;
            this.gameOver(false); 
        }
    }

    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin(){
        const hiddenLetters = document.querySelectorAll('.hide').length; 

        if (hiddenLetters === 0){
            return true; 
        } else {
            return false; 
        }
    }

    /**
    * Displays game over message
    * @param {boolean} gameWon - Whether or not the user won the game
    */
    gameOver(gameWon){
        const gameOverMsg = document.querySelector('#game-over-message'); 
        const gameReset = document.querySelector('#btn__reset'); 
        startScreen.style.display = ''; 

        if(gameWon){
            gameOverMsg.innerHTML = 'Congratulations Champ! You Won!'; 
            gameReset.textContent = 'Keep The Streak?'; 
            startScreen.className = 'win'; 
        } else {
            gameOverMsg.innerHTML = "Oh man! Well There's Always Next Time"
            gameReset.innerHTML = 'Go Again?'
            startScreen.className = 'lose'; 
        }
    }

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button){
       const phrase = this.activePhrase; 
       const pressButton = button.target; 
       const buttonTxt = pressButton.textContent; 

        if (phrase.checkLetter(buttonTxt)){
            pressButton.classList.add('chosen');
            phrase.showMatchedLetter(buttonTxt);
            this.checkForWin(); 

            if (this.checkForWin()){
                this.gameOver(gameWon); 
            }
            
        } else if (!phrase.checkLetter(buttonTxt)){
            pressButton.classList.add('wrong'); 

            if (pressButton.classList.contains('wrong')){
                this.removeLife(); 
            }
        }
        pressButton.setAttribute('disabled', true); 
    }

    resetGame(e){
        const livesLeft = document.querySelectorAll('li.tries');  
        const qwertyBtns = document.querySelectorAll('button.key'); 
        const phraseList = document.querySelector('#phrase ul')

        //Reset game variables 
        this.missed = 0; 
        //Reset gaming lives
        livesLeft.forEach(life =>{
        life.firstElementChild.src = 'images/liveHeart.png'; })
        //enable on screen keyboard buttons & reset class
        qwertyBtns.forEach(button =>{
            button.disabled = false; 
            button.classList.remove('wrong'); 
            button.classList.remove('chosen'); 
        })
        //removing li elements from the game screen 
        phraseList.innerHTML = ''; 
    }
}