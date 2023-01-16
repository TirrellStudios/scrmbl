function saveLocal() {
  let data = {
    word: dailyWord,
    scrmbls: scrmblCount,
    time: timer
  }
  localStorage.setItem('score', JSON.stringify(data))
}

function checkForSave() {
  let game = JSON.parse(localStorage.getItem('score'))
  if (!game || game.word !== dailyWord) return false
  scrmblCount = game.scrmbls
  timer = game.time
  gameover = true
  answer = dailyWord
  renderScores()
  renderInputTiles()
  renderKeyboard()
  activateStatsButton()
  listen()
  return true
}