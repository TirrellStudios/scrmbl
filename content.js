const wordContainer = document.getElementById('word-container')
const wordLetters = wordContainer.getElementsByTagName('div')
const inputContainer = document.getElementById('input-container')
const inputLetters = inputContainer.getElementsByTagName('div')
const keyboardContainer = document.getElementById('keyboard-container')
const scrmblButton = document.getElementById('scrmbl-button')
const scoreContainer = document.getElementById('score-container')
const infoContainer = document.getElementById('info-container')
const startView = document.getElementById('start-view')
const startButton = document.getElementById('start-button')
const gameoverView = document.getElementById('gameover-view')
const finalScrmblDisplay = document.getElementById('scrmbl-display')
const finalGuessDisplay = document.getElementById('guess-display')
const finalTimeDisplay = document.getElementById('second-display')

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
}

function showInfoContainer() {
  infoContainer.classList.add('active')
}

function showStartView() {
  gameoverView.classList.remove('active')
  startView.classList.add('active')
  showInfoContainer()
}

function showGameoverView() {
  gameoverView.classList.add('active')
  startView.classList.remove('active')
  showInfoContainer()
}

function renderGameOver() {
  finalScrmblDisplay.innerText = `You used ${scrmblCount} Scrmbls,`
  finalGuessDisplay.innerText = `${guessCount} guesses,`
  finalTimeDisplay.innerText = `and took you ${Math.floor(timer)} seconds`
  showGameoverView()
}

function renderGame() {
  renderScrmblTiles()
  renderInputTiles()
}