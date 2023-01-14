let dailyWord = ''
let answer = ''
let scrmblCount = 0
let timer = 0
let gameover = false

function getDailyScrmbl(callback) {
  fetch('https://xj8a0b5rzj.execute-api.us-east-1.amazonaws.com/default/getScrmblWord')
    .then(response => {
      return response.json()
    })
    .then(data => {
      dailyWord = data.message.toUpperCase()
      callback()
    })
}

function scrmblWord() {
  const letters = dailyWord.split('')
  letters.sort((a, b) => {
    return 0.5 - Math.random()
  })
  return letters.join('')
}

function scrmbl() {
  renderScrmblTiles()
  scrmblCount++
  renderScores()
}

function addLetter(letter) {
  if (gameover) return
  if (answer.length >= dailyWord.length) return
  answer += letter.toUpperCase()
  renderInputTiles()
}

function removeLetter() {
  if (gameover) return
  if (answer.length === 0) return
  answer = answer.slice(0, -1)
  renderInputTiles()
}

function submitAnswer() {
  if (gameover) return
  if (answer.length !== dailyWord.length) {
    shakeInputTiles()
    return
  }
  if (answer.toLowerCase() !== dailyWord.toLowerCase()) {
    answer = ''
    renderInputTiles()
    shakeInputTiles()
    renderScores()
  }
  else {
    gameover = true
    stopTimer()
    renderGameOver()
  }
}

let startTime
function startTimer() {
  startTime = new Date();
}

let endTime
function stopTimer() {
  endTime = new Date();
  timer = (endTime - startTime) / 1000
}