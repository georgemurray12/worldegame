const words = ["apple", "grape", "beach", "clown", "daisy", "flame", "glove", "house", "jelly", "kites", "lemon", "mango", "night", "ocean", "pearl", "quest", "robot", "sugar", "tiger", "vivid"];
let targetWord = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;
let currentGuess = '';

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
  const key = event.key.toLowerCase();

  if (key === 'enter' && currentGuess.length === 5) {
    checkGuess();
    currentGuess = '';
  } else if (key === 'backspace' && currentGuess.length > 0) {
    removeLastLetter();
  } else if (/^[a-z]$/.test(key) && currentGuess.length < 5) {
    addLetter(key);
  }
}

function addLetter(letter) {
  currentGuess += letter;
  const row = document.querySelectorAll(".row")[currentRow];
  const tiles = row.querySelectorAll(".tile");
  tiles[currentGuess.length - 1].textContent = letter;
}

function removeLastLetter() {
  currentGuess = currentGuess.slice(0, -1);
  const row = document.querySelectorAll(".row")[currentRow];
  const tiles = row.querySelectorAll(".tile");
  tiles[currentGuess.length].textContent = '';
}

function checkGuess() {
  const row = document.querySelectorAll(".row")[currentRow];
  const tiles = row.querySelectorAll(".tile");

  currentGuess.split('').forEach((letter, index) => {
    const tile = tiles[index];
    if (targetWord[index] === letter) {
      tile.classList.add('correct');
    } else if (targetWord.includes(letter)) {
      tile.classList.add('present');
    } else {
      tile.classList.add('absent');
    }
  });

  currentRow++;
  if (currentGuess === targetWord) {
    alert('Congratulations! You guessed the word!');
    document.removeEventListener('keydown', handleKeyPress);
  } else if (currentRow === 6) {
    alert(`Game over! The word was ${targetWord}`);
    document.removeEventListener('keydown', handleKeyPress);
  }
}

function resetGame() {
  targetWord = words[Math.floor(Math.random() * words.length)];
  currentRow = 0;
  currentGuess = '';
  document.querySelectorAll('.tile').forEach(tile => {
    tile.textContent = '';
    tile.className = 'tile';
  });
  document.addEventListener('keydown', handleKeyPress);
}


