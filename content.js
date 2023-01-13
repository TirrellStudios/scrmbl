const wordContainer = document.getElementById('word-container')
const wordLetters = wordContainer.getElementsByTagName('div')
const inputContainer = document.getElementById('input-container')
const inputLetters = inputContainer.getElementsByTagName('div')
const keyboardContainer = document.getElementById('keyboard-container')
const scrmblButton = document.getElementById('scrmbl-button')
const scoreContainer = document.getElementById('score-container')
const infoContainer = document.getElementById('info-container')
const startButton = document.getElementById('start-button')

function createElement(type, classNames, text, parent) {
  const element = document.createElement(type)
  if (classNames) {
    classNames.forEach(className => {
      element.classList.add(className)
    })
  }
  if (text) element.innerText = text
  if (parent) parent.appendChild(element)
  return element
}

function clearContainer(container) {
  while (container.firstChild) container.removeChild(container.firstChild)
}

function renderScores() {
  clearContainer(scoreContainer)
  createElement('p', ['scrmbl-count'], `Scrmbls: ${scrmblCount}`, scoreContainer)
  createElement('p', ['guess-count'], `Guesses: ${guessCount}`, scoreContainer)
}

function renderScrmblTiles() {
  clearContainer(wordContainer)
  let scrmbledWord = scrmblWord()
  while (scrmbledWord[0] === dailyWord[0] || scrmbledWord[-1] !== dailyWord[-1]) scrmbledWord = scrmblWord()
  for (let i = 0; i < dailyWord.length; i++) {
    createElement('div', null, scrmbledWord[i], wordContainer)
  }
}

function renderInputTiles() {
  clearContainer(inputContainer)
  for (let i = 0; i < dailyWord.length; i++) {
    createElement('div', null, answer[i], inputContainer)
  }
}

function shakeInputTiles() {
  if (inputContainer.classList.contains('shake')) return
  inputContainer.classList.add('shake')
  setTimeout(() => {
    inputContainer.classList.remove('shake')
  }, 500)
}

function renderKeyboard() {
  clearContainer(keyboardContainer)
  const keyboard = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
  ]
  for (let i = 0; i < keyboard.length; i++) {
    const keyboardRow = createElement('div', ['keyboard-row'], null, keyboardContainer)
    for (let j = 0; j < keyboard[i].length; j++) {
      createElement('button', ['key', keyboard[i][j].toLowerCase()], keyboard[i][j], keyboardRow)
    }
  }
}

function hideInfoContainer() {
  infoContainer.classList.remove('active')
  infoContainer.classList.add('inactive')
}

function showInfoContainer() {
  infoContainer.classList.remove('inactive')
  infoContainer.classList.add('active')
}

function renderGame() {
  renderScrmblTiles()
  renderInputTiles()
}