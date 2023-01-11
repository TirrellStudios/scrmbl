const game = (() => {
  const word = 'CONVICTION'
  let answer = ''
  let guessCount = 0
  let scrmblCount = 0

  const scrmblWord = () => {
    const letters = word.split('')
    letters.sort((a, b) => {
      return 0.5 - Math.random()
    })
    return letters.join('')
  }

  const scrmbl = () => {
    render.scrmblTiles()
    scrmblCount++
    render.scores()
  }

  const addLetter = (letter) => {
    if (answer.length >= word.length) return
    answer += letter.toUpperCase()
    render.inputTiles()
  }

  const removeLetter = () => {
    if (answer.length === 0) return
    answer = answer.slice(0, -1)
    render.inputTiles()
  }

  const submitAnswer = () => {
    if (answer.length !== word.length) {
      render.shakeInputTiles()
      return
    }
    guessCount++
    if (answer.toLowerCase() !== word.toLowerCase()) {
      console.log('Incorrect guess')
      answer = ''
      render.inputTiles()
      render.shakeInputTiles()
      render.scores()
    }
    else {
      console.log('You won!')
      render.scores()
      resetGame()    
    }
  }

  const resetGame = () => {
    guessCount = 0
    scrmblCount = 0
    answer = ''
    render.renderGame()
  }

  const render = (() => {
    const wordContainer = document.getElementById('word-container')
    const wordLetters = wordContainer.getElementsByTagName('div')
    const inputContainer = document.getElementById('input-container')
    const inputLetters = inputContainer.getElementsByTagName('div')
    const keyboardContainer = document.getElementById('keyboard-container')
    const scrmblButton = document.getElementById('scrmbl-button')
    const scoreContainer = document.getElementById('score-container')

    const createElement = (type, className, text, parent) => {
      const element = document.createElement(type)
      if (className) element.classList.add(className)
      if (text) element.innerText = text
      if (parent) parent.appendChild(element)
      return element
    }
    
    const scores = () => {
      clearContainer(scoreContainer)
      createElement('p', 'scrmbl-count', 'Scrmbls: ' + scrmblCount, scoreContainer)
      createElement('p', 'guess-count', 'Guesses: ' + guessCount, scoreContainer)
    }

    const scrmblTiles = () => {
      clearContainer(wordContainer)
      let scrmbledWord = scrmblWord()
      while (scrmbledWord[0] === word[0] || scrmbledWord[-1] !== word[-1]) scrmbledWord = scrmblWord()
      for (let i = 0; i < word.length; i++) {
        createElement('div', null, scrmbledWord[i], wordContainer)
      }
    }

    const inputTiles = () => {
      clearContainer(inputContainer)
      for (let i = 0; i < word.length; i++) {
        createElement('div', null, )
        const inputLetter = document.createElement('div')
        if (answer[i]) inputLetter.innerText = answer[i]
        inputContainer.appendChild(inputLetter)
      }
    }

    const shakeInputTiles = () => {
      if (inputContainer.classList.contains('shake')) return
      inputContainer.classList.add('shake')
      setTimeout(() => {
        inputContainer.classList.remove('shake')
      }, 500)
    }

    const keyboard = () => {
      clearContainer(keyboardContainer)
      const keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
      ]
      for (let i = 0; i < keyboard.length; i++) {
        const keyboardRow = document.createElement('div')
        keyboardRow.classList.add('keyboard-row')
        for (let j = 0; j < keyboard[i].length; j++) {
          const key = document.createElement('button')
          key.classList.add('key')
          key.classList.add(keyboard[i][j].toLowerCase())
          key.innerText = keyboard[i][j]
          keyboardRow.appendChild(key)
        }
        keyboardContainer.appendChild(keyboardRow)
      }
    }

    const clearContainer = (container) => {
      while (container.firstChild) container.removeChild(container.firstChild)
    }

    const renderGame = () => {
      scrmblTiles()
      inputTiles()
    }

    (() => {
      scores()
      scrmblTiles()
      inputTiles()
      keyboard()
    })()

    return { scrmblTiles, inputTiles, shakeInputTiles, renderGame, scores }
  })()

  const events = (() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase()
      if (key === 'enter') submitAnswer()
      else if (key === 'backspace' || key === 'delete') removeLetter()
      else if (key.match(/^[a-z]$/)) addLetter(e.key)
    }
    document.onkeydown = (e) => handleKeyPress(e)
    document.getElementById('scrmbl-button').onclick = () => scrmbl()
    const keys = document.getElementsByClassName('key')
    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = () => {
        handleKeyPress({ key: keys[i].innerText })
      }
    }
  })()
})()