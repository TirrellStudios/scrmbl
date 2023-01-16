function listen() {
  const handleKeyPress = (e) => {
    const key = e.key.toLowerCase()
    if (key === 'enter') {
      submitAnswer()
      return
    }
    else if (key === 'backspace' || key === 'delete') {
      removeLetter()
      return
    }
    const keyboardKeys = document.getElementsByClassName('key')
    for (let i = 0; i < keyboardKeys.length; i++) {
      if (keyboardKeys[i].innerText === key.toUpperCase()) {
        if (!keyboardKeys[i].classList.contains('fade')) {
          if (key.match(/^[a-z]$/)) addLetter(key)
        }
      }
    }
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
    startTimer()
    hideInfoContainer()
  }
  shareButton.onclick = () => {
    let message = `Here's how my Scrmbl went for ${date}:\n`
    message += `It took me ${Math.floor(timer)} seconds to guess the word,\n`
    message += `And I used the Scrmbl button ${scrmblCount} times.\n\n`
    message += `Can you do better?\n`
    message += `https://scrmbl.net`
    if (!navigator.share) {
      navigator.clipboard.writeText(message)
      shareButton.innerText = 'Copied!'
      setTimeout(() => {
        shareButton.innerText = 'Share'
      }, 2000)
      return
    }
    navigator.share({
      title: 'Scrmbl',
      text: message
    })
  }
}

window.onload = () => {
  getDailyScrmbl(() => {
    if (checkForSave()) return
    showStartView()
    renderScores()
    renderScrmblTiles()
    renderInputTiles()
    renderKeyboard()
    listen()
  })
}