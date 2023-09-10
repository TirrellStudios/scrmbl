import { useEffect } from 'react';

function KeyboardListener({ addLetter, removeLetter, submitGuess, word, countLetter, letterCountInGuess }) {
  useEffect(() => {
    const handleKeyPress = (event) => {
      const ignoredKeys = ['Shift', 'Meta', 'Alt', 'Control', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];
      if (ignoredKeys.includes(event.key)) {
        return;
      }
      if (event.key === 'Backspace' || event.key === 'Delete') {
        removeLetter();
      } else if (
        word.includes(event.key.toUpperCase()) && 
        letterCountInGuess(event.key.toUpperCase()) < countLetter(event.key.toUpperCase(), word) &&
        ((event.key >= 'a' && event.key <= 'z') || (event.key >= 'A' && event.key <= 'Z'))
      ) {
        addLetter(event.key.toUpperCase());
      }
    };    

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [addLetter, removeLetter, submitGuess, word, countLetter, letterCountInGuess]);

  return null;
}

export default KeyboardListener;