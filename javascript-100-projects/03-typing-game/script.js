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

  $paragraph.innerHTML = words.map((word, index) => {
    const letter = word.split('');

    return `<x-word>${letter
      .map((letter) => `<x-letter>${letter}</x-letter>`)
      .join('')}</x-word>`;
  });

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
function initEvents() {}
function gameOver() {}
