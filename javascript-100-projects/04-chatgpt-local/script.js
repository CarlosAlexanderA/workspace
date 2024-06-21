import {CreateMLCEngine} from 'https://esm.run/@mlc-ai/web-llm';

const SELECTED_MODEL = 'phi-1_5-q4f16_1-MLC';
const engine = await CreateMLCEngine(SELECTED_MODEL, {
  initProcessCallback: (info) => {
    console.log('initProcessCallback', info);
  },
});

const $ = (el) => document.querySelector(el);

// ponemos el simbolo para indicar que es parte del DOM
const $form = $('form');
const $input = $('input');
const $template = $('#message-template');
const $messages = $('ul');
const $container = $('main');
const $button = $('button');

$form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const messageText = $input.value.trim();

  if (messageText !== '') {
    $input.value = '';
  }
  addMessage(messageText, 'user');
  $button.setAttribute('disabled', true);

  setTimeout(() => {
    addMessage('Hola, ¿como estas?', 'bot');
    $button.removeAttribute('disabled');
  }, 2000);
});

function addMessage(text, sender) {
  //clonar el template
  const clonedTemplate = $template.content.cloneNode(true);
  const $newMessage = clonedTemplate.querySelector('.message');

  const $who = clonedTemplate.querySelector('span');
  const $text = clonedTemplate.querySelector('p');

  $text.textContent = text;
  $who.textContent = sender === 'bot' ? 'GPT' : 'Tú';

  $newMessage.classList.add(sender);

  $messages.appendChild($newMessage);

  // ponemos el scroll automatco
  $container.scrollTop = $container.scrollHeight;
}
