/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase(); 
    }

    //method for showing the phrase in the phrase hunter gaming screen
    addPhraseToDisplay(){
        const phraseParent = document.querySelector('ul'); 
        const letterArray = this.phrase.split(''); 

        letterArray.forEach(letter =>{
            if (letter !== ' '){
            phraseParent.innerHTML += `<li class="hide letter ${letter}">${letter}</li>`; 
            } else {
            phraseParent.innerHTML+=`<li class="space">${letter}</li>`
            }
        });
    }; 
    /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
    checkLetter(letter){
        const phrase = this.phrase; 

        if (phrase.includes(letter)){
            return true; 
        } else {
            return false; 
        }
    };

    /**
    * Displays passed letter on screen after a match is found
    * @param (string) letter - Letter to display
    */
    showMatchedLetter(letter) {
        const hiddenLetters = document.querySelectorAll('#phrase li'); 

        hiddenLetters.forEach(hiddenLetter =>{ 
            if (hiddenLetter.classList.contains(letter)){
                hiddenLetter.classList.replace("hide", "show"); 
            }
        })
    };
}