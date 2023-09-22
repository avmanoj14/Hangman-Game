const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessageWin = document.getElementById('final-message-win');
const finalMessageLost = document.getElementById('final-message-lost');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard','mumbai', 'chennai', 'laptop', 'phone', 'watch','animal','lion','king','university','college','office' ];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];

// Final messages for Winning
const finalMessagesWin = [
  'Congratulations Kanna! You won! 😃',
  'Great job Kanna!! 🎉',
  'Well done Kanna atlast You are a hangman champion! 🏆',
  'Victory Kanna chala kashtapaddava 🙌',
  'Euuuu Kannna Euuu 🔥',
  'Simpesav Kanna Euuu 😘',
];

// Final Message for Losing
const finalMessagesLost = [
  'Chee Kanna idi kuda rada',
  'Picha waste nuvvu',
  'Neeku enduke Hangman go Hang yourself',
  'Amma vodi bokka neeku',
  'Naaku nuvvu asal ela dorikave',
];

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
          </span>
        `
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

  if (innerWord === selectedWord) {
    const randomMessage = getRandomMessage(finalMessagesWin);
    finalMessageWin.innerText = randomMessage;
    finalMessageLost.innerText = '';
    finalMessageRevealWord.innerText = '';
    popup.style.display = 'flex';

    playable = false;
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    const randomMessage = getRandomMessage(finalMessagesLost);
    finalMessageLost.innerText = randomMessage;
    finalMessageWin.innerText = '';
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = 'flex';

    playable = false;
  }
}

// Show notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Get a random final message
function getRandomMessage(messages) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

// Keydown letter press
window.addEventListener('keydown', e => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);

          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);

          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  playable = true;

  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';
});

displayWord();






/* Hangman code where word is fetched from API

const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');


const figureParts = document.querySelectorAll('.figure-part');

let selectedWord = 'a';

let playable = true;


const correctLetters = [];
const wrongLetters = [];

const finalMessages = [
    'Congratulations! You won! 😃',
    'Great job! You guessed it right! 🎉',
    'Well done! You are a hangman champion! 🏆',
    'Victory! You cracked the word! 🙌',
  ];


// Fetch random word from the API
async function fetchRandomWord() {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await response.json();
    selectedWord = data[0];
    displayWord();
  } catch (error) {
    console.log('Error fetching a random word from the API:', error);
  }
}

// Show hidden word
function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split('')
      .map(
        letter => `
        <span class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </span>`
      )
      .join('')}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    // finalMessage.innerText = 'Congratulations! You won! 😃';
    const randomMessage = getRandomMessage();
    finalMessage.innerText = randomMessage;
    finalMessageRevealWord.innerText = '';
    popup.style.display = 'flex';

    playable = false;
  }
}

// Update the wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // Check if Lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = 'flex';

    playable = false;

  }
}

// Show Notification
function showNotification() {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Get a random final message
function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * finalMessages.length);
    return finalMessages[randomIndex];
  }

// Keydown letter press
window.addEventListener('keydown', e => {
    if (playable) {
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            const letter = e.key;
        
            if (selectedWord.includes(letter)) {
              if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
              } else {
                showNotification();
              }
            } else {
              if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
              } else {
                showNotification();
              }
            }
          }
    }
 
});

// Restart Game and play again
playAgainBtn.addEventListener('click', () => {
    playable = true;

  // Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  fetchRandomWord();
  updateWrongLettersEl();
  popup.style.display = 'none';
});

// Fetch a random word initially
fetchRandomWord();

*/
