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
    letter = letter.toUpperCase()
    for (let i = 0; i < render.DOM.inputLetters.length; i++) {
      if (render.DOM.inputLetters[i].innerText == '') {
        render.DOM.inputLetters[i].innerText = letter
        answer += letter
        break
      }
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
  
    const renderScrmblTiles = () => {
      let scrmbledWord = scrmbl(word)
      while (scrmbledWord[0] === word[0] || scrmbledWord[-1] !== word[-1]) scrmbledWord = scrmbl(word)
      for (let i = 0; i < word.length; i++) {

        const letter = document.createElement('div')
        letter.innerText = scrmbledWord[i]
        DOM.wordContainer.appendChild(letter)
      }
    }
  
    const renderInputTiles = () => {
      for (let i = 0; i < word.length; i++) {
        const inputLetter = document.createElement('div')
        DOM.inputContainer.appendChild(inputLetter)
      }
    }
  
    const renderKeyboard = () => {
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

    const renderAll = () => {
      renderScrmblTiles()
      renderInputTiles()
      renderKeyboard()
    }
    renderAll()

    return { DOM }
  })()

  const events = (() => {
    const handleKeyPress = (e) => {
      e.key = e.key.toLowerCase()
      if (e.key === "enter") submitAnswer()
      else if (e.key === "backspace" || e.key === "delete") removeLetter()
      else if (e.key.match(/^[a-z]$/)) addLetter(e.key)
    }
    document.onkeydown = (e) => handleKeyPress(e)
    const keys = document.getElementsByClassName('key')
    for (let i = 0; i < keys.length; i++) {
      keys[i].onclick = () => {
        handleKeyPress({ key: keys[i].innerText })
      }
    }
  })()

  return { word, answer }
})()