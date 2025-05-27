const guessedLetterElement = document.querySelector (".guessed-letters"); 
const guessButton = document.querySelector (".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const guessedLetters = [];


const getWord = async function () {
    const response = await fetch(
      "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const words = await response.text();
    
    const wordArray = words.split ("\n")
    console.log (wordArray);

    const randomIndex = Math.floor (Math.random () * wordArray.length);
    const randomWord = wordArray[randomIndex].trim();

    word = randomWord.toUpperCase();
  placeholder(word);
  };
let remainingGuesses = 8;

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



const placeholder = (word) => {
    const placeholderSymbols = [];

    for (let letter of word) {
        console.log (letter);
        placeholderSymbols.push ("●")
    }
    wordInProgress.innerText = placeholderSymbols.join ("");
};



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
    countRemainingGuesses(guess);
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
    
const countRemainingGuesses = function (guess) {
    const UpperWord = word.toUpperCase ();
    if (!UpperWord.includes (guess)) {
        message.innerText= `Sorry, the word has no ${guess}.`;
        remainingGuesses -=1; 
        
    } else {
        message.innerText =`Good guess! The word has letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word was ${word}.`;
      } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `1 guess`;
      } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
      }
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
      
      let word;
      getWord();