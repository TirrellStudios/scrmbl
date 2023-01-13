function listen() {
  const handleKeyPress = (e) => {
    const key = e.key.toLowerCase()
    if (key === 'enter') submitAnswer()
    else if (key === 'backspace' || key === 'delete') removeLetter()
    else if (key.match(/^[a-z]$/)) addLetter(e.key)
  }
  document.onkeydown = (e) => handleKeyPress(e)
  scrmblButton.onclick = () => scrmbl()
  const keys = document.getElementsByClassName('key')
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = () => {
      handleKeyPress({ key: keys[i].innerText })
    }
  }
  startButton.onclick = () => {
    hideInfoContainer()
  }
}

window.onload = () => {
  showStartView()
  getDailyScrmbl(() => {
    renderScores()
    renderScrmblTiles()
    renderInputTiles()
    renderKeyboard()
    listen()
  })
}