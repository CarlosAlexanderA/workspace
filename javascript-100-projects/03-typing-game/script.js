const $ = (el) => document.querySelector(el);
const $time = $('time');
const $paragraph = $('p');
const $input = $('input');

const INITIAL_TIME = 30;

const TEXT =
  'the quick brown fox jumps over the lazy dog and midudev is trying to clone monkey type for fun and profit using vanilla js for the typing test speed';

let words = [];
let currentTime = INITIAL_TIME;

initGame();
initEvents();

function initGame() {
  words = TEXT.split(' ').slice(0, 32);
  currentTime = INITIAL_TIME;

  $time.textContent = currentTime;
  console.log(
    words.map((word) => {
      return word;
    })
  );
  $paragraph.innerHTML = words
    .map((word, index) => {
      const letter = word.split('');

      return `<x-word>${letter
        .map((letter) => `<x-letter>${letter}</x-letter>`)
        .join('')}</x-word>`;
    })
    .join('');

  const $firstWord = $paragraph.querySelector('x-word');

  $firstWord.classList.add('active');
  $firstWord.querySelector('x-letter').classList.add('active');

  const intervalId = setInterval(() => {
    currentTime--;
    $time.textContent = currentTime;

    if (currentTime === 0) {
      clearInterval(intervalId);
      gameOver();
    }
  }, 1000);
}
function initEvents() {
  document.addEventListener('keydown', () => {
    $input.focus();
  });

  $input.addEventListener('keydown', onKeyDown);
  $input.addEventListener('keyup', onKeyUp);
}

function onKeyDown(event) {
  const $currentWord = $paragraph.querySelector('x-word.active');
  const $currentLetter = $paragraph.querySelector('x-letter.active');

  const {key} = event;

  if (key === ' ') {
    event.preventDefault();
    const $nextWord = $currentWord.nextElementSibling;
    const $nextLetter = $nextWord.querySelector('x-letter');

    $currentWord.classList.remove('active', 'marked');
    $currentLetter.classList.remove('active');

    $nextWord.classList.add('active');
    $nextLetter.classList.add('active');

    $input.value = '';

    const hasMissedLetters =
      $currentWord.querySelectorAll('x-letter:not(.correct)').length > 0;

    const classToAdd = hasMissedLetters ? 'marked' : 'correct';
    $currentWord.classList.add(classToAdd);
  }
}
function onKeyUp() {
  // recuperamos los elementos actuales
  const $currentWord = $paragraph.querySelector('x-word.active');
  const $currentLetter = $paragraph.querySelector('x-letter.active');

  const currentWord = $currentWord.innerText.trim();
  $input.maxLength = currentWord.length;
  console.log({
    value: $input.value,
    currentWord,
  });

  const $allLetters = $currentWord.querySelectorAll('x-letter');

  $allLetters.forEach(($letter) =>
    $letter.classList.remove('correct', 'incorrect')
  );

  $input.value.split('').forEach((char, index) => {
    const $letter = $allLetters[index];
    const letterToCheck = currentWord[index];

    const isCorrect = char === letterToCheck;
    const letterClass = isCorrect ? 'correct' : 'incorrect';
    $letter.classList.add(letterClass);
  });

  $currentLetter.classList.remove('active', 'is-last');
  const inputLength = $input.value.length;
  const $nextActiveLetter = $allLetters[inputLength];

  if ($nextActiveLetter) {
    $nextActiveLetter.classList.add('active');
  } else {
    $currentLetter.classList.add('active', 'is-last');
  }
}

function gameOver() {}
