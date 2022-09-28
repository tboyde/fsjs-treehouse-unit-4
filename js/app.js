/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

const game = new Game();
const reStartBtn = document.querySelector('#btn__reset'); 

const qwertyBoard = document.querySelector('#qwerty'); 
const keys = document.querySelectorAll('button.key'); 


reStartBtn.addEventListener('click', (e) =>{
    game.resetGame(e);
    game.startGame();
})

qwertyBoard.addEventListener('click', (e) => {
    if (e.target.className === 'key'){
        game.handleInteraction(e); 
        console.log(e.target.innerHTML); 
    }
}); 
