const guessedLetterElement = document.querySelector (".guessed-letters"); 
const guessButton = document.querySelector (".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const guessedLetters = [];

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter at a time.";
    } else if (!input.match (acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

let word = "MAGNOLIA"; 

const placeholder = (word) => {
    const placeholderSymbols = [];

    for (let letter of word) {
        console.log (letter);
        placeholderSymbols.push ("●")
    }
    wordInProgress.innerText = placeholderSymbols.join ("");
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = "";

    const guess = letterInput.value;
    const goodGuess = validateInput(guess);
    if (goodGuess) {
        makeGuess (goodGuess);
    }


    letterInput.value = "";
});


const makeGuess = function (guess) {
    guess = guess.toUpperCase();

if (guessedLetters.includes (guess)) {
    message.innerText = "You already guessed that letter. Try again!";
} else {
    guessedLetters.push (guess);
    console.log (guessedLetters);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
}
};

const showGuessedLetters = function () {
    guessedLetterElement.innerHTML = "";

    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter; 
        guessedLetterElement.append (li);
    }
    };


    const updateWordInProgress = function(guessedLetters) {
        const wordUpper = word.toUpperCase();
        const wordArray = wordUpper.split("");
        console.log(wordArray); 
      
        const revealWord = [];
      
        for (let letter of wordArray) {
          if (guessedLetters.includes(letter)) {
            revealWord.push(letter);
          } else {
            revealWord.push("●");
          }
        }
      
        wordInProgress.innerText = revealWord.join("");
        checkIfWin ();
      };
    
      const checkIfWin = function () {
        const revealed = wordInProgress.innerText.trim().toUpperCase();
        const target = word.toUpperCase();
        
        console.log("revealed:", revealed);
        console.log("target:", target);
      
        if (revealed === target) {
          message.classList.add("win");
          message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        }
      };