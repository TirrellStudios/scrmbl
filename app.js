const game = (() => {
  const word = 'CONVICTION'
  let answer = ''

  const scrmbl = (word) => {
    const letters = word.split('')
    letters.sort((a, b) => {
      return 0.5 - Math.random();
    })
    return letters.join('')
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
    if (answer.length !== word.length) return
    if (answer !== word)  {
      alert('Incorrect guess')
      answer = ''
      render.inputTiles()
    }
    else {
      alert('You won!')
      answer = ''
      render.renderGame()
    }
  }

  const render = (() => {
    const DOM = (() => {
      const wordContainer = document.getElementById('word-container')
      const wordLetters = wordContainer.getElementsByTagName('div')
      const inputContainer = document.getElementById('input-container')
      const inputLetters = inputContainer.getElementsByTagName('div')
      const keyboardContainer = document.getElementById('keyboard-container')

      return { wordContainer, wordLetters, inputContainer, inputLetters, keyboardContainer}
    })()
  
    const scrmblTiles = () => {
      clearContainer(DOM.wordContainer)
      let scrmbledWord = scrmbl(word)
      while (scrmbledWord[0] === word[0] || scrmbledWord[-1] !== word[-1]) scrmbledWord = scrmbl(word)
      for (let i = 0; i < word.length; i++) {

        const letter = document.createElement('div')
        letter.innerText = scrmbledWord[i]
        DOM.wordContainer.appendChild(letter)
      }
    }
  
    const inputTiles = () => {
      clearContainer(DOM.inputContainer)
      for (let i = 0; i < word.length; i++) {
        const inputLetter = document.createElement('div')
        if (answer[i]) inputLetter.innerText = answer[i]
        DOM.inputContainer.appendChild(inputLetter)
      }
    }
  
    const keyboard = () => {
      clearContainer(DOM.keyboardContainer)
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
        DOM.keyboardContainer.appendChild(keyboardRow)
      }
    }

    const clearContainer = (container) => {
      while (container.firstChild) container.removeChild(container.firstChild)
    }

    const renderGame = () => {
      scrmblTiles()
      inputTiles()
    }

    const renderAll = (() => {
      scrmblTiles()
      inputTiles()
      keyboard()
    })()

    return { inputTiles, renderGame }
  })()

  const events = (() => {
    const handleKeyPress = (e) => {
      const lowerCase = e.key.toLowerCase()
      if (lowerCase === "enter") submitAnswer()
      else if (lowerCase === "backspace" || lowerCase === "delete") removeLetter()
      else if (lowerCase.match(/^[a-z]$/)) addLetter(e.key)
    }
    document.onkeydown = (e) => handleKeyPress(e)
    const keys = document.getElementsByClassName('key')
    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = () => {
        handleKeyPress({ key: keys[i].innerText })
      }
    }
  })()
})()