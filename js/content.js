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
const shareButton = document.getElementById('share-button')
const finalResultsDisplay = document.getElementById('final-results-display')

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
}

function renderScrmblTiles() {
  clearContainer(wordContainer)
  let scrmbledWord = scrmblWord()
  for (let i = 0; i < dailyWord.length; i++) {
    createElement('div', ['word-tile'], scrmbledWord[i], wordContainer)
  }
  fadeLettersUsed()
}

function fadeLettersUsed() {
  let wordTiles = document.getElementsByClassName('word-tile')
  for (let i = 0; i < wordTiles.length; i++) {
    wordTiles[i].classList.remove('fade')
  }
  for (let i = 0; i < answer.length; i++) {
    for (let j = 0; j < wordTiles.length; j++) {
      if (answer[i] === wordTiles[j].innerText && !wordTiles[j].classList.contains('fade')) {
        wordTiles[j].classList.add('fade')
        break
      }
    }
  }
}

function renderInputTiles() {
  clearContainer(inputContainer)
  for (let i = 0; i < dailyWord.length; i++) {
    createElement('div', ['input-tile'], answer[i], inputContainer)
  }
  fadeLettersUsed()
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
  let message = `It took you ${Math.floor(timer)} seconds to guess the word,\n`
  message += `And you used the Scrmbl button ${scrmblCount} times.\n\n`
  message += `Can your friends do better?`
  finalResultsDisplay.innerText = message
  showGameoverView()
}

function renderGame() {
  renderScrmblTiles()
  renderInputTiles()
}