import React from 'react';
import styled from 'styled-components';

const KeyboardGrid = styled.div`
  display: flex;
  width: 98%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 5px;
`;

const KeyboardRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Key = styled.button`
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  background-color: #333;
  border: none;
  cursor: pointer;
  margin: 4px;
  width: 100%;
  height: 55px;
  opacity: ${props => props.isActive ? '1' : '0.3'};
  pointer-events: ${props => props.isActive ? 'auto' : 'none'};
  &:hover {
    background-color: #444;
  }
  &:active {
    background-color: #555;
  }
`;

const Keyboard = ({ addLetter, removeLetter, submitGuess, word, guess, letterCountInGuess, countLetter }) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
  ]

  return (
    <KeyboardGrid>
      {keys.map((row, rowIndex) => (
        <KeyboardRow key={rowIndex}>
          {row.map((letter, index) => (
            <Key 
              key={index}
              isActive={['ENTER', 'DELETE'].includes(letter) || 
              (word.includes(letter) && 
              letterCountInGuess(letter) < countLetter(letter, word))}
              onClick={() => {
                if (letter === 'ENTER') submitGuess();
                else if (letter === 'DELETE') removeLetter();
                else addLetter(letter);
              }}
            >
              {letter}
            </Key>
          ))}
        </KeyboardRow>
      ))}
    </KeyboardGrid>
  );
};

export default Keyboard;