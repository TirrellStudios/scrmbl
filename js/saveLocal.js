function saveLocal() {
  let data = {
    scrmbls: scrmblCount,
    time: timer
  }
  localStorage.setItem(date, JSON.stringify(data))
}

function checkForSave() {
  if (!localStorage.getItem(date)) return
  let game = JSON.parse(localStorage.getItem(date))
  scrmblCount = game.scrmbls
  timer = game.time
  gameover = true
  renderGameOver()
  listen()
  return true
}