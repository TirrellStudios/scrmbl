import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Welcome from './components/Welcome';
import scrmbl from './img/scrmbl.svg'
import Keyboard from './components/Keyboard';
import ScrmblStyledWord from './components/ScrmblStyle';
import ScrmblButton from './components/ScrmblButton';
import KeyboardListener from './components/KeyboardListener';
import getDailyScrmbl from './getDailyScrmbl';
import GameOver from './components/GameOver';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 100%;
  background: #000;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  background: #333;
  width: 100%;
`;

const Branding = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const ScrmblContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  background: #333;
  border-radius: 100px;
`;

function App() {
  const [helpActive, setHelpActive] = React.useState(true);
  const [word, setWord] = React.useState('');
  const [scrmbled, setScrmbled] = React.useState('');
  const [guess, setGuess] = React.useState('');
  const [correctIndexes, setCorrectIndexes] = React.useState([]);
  const [scrmblsLeft, setScrmblsLeft] = React.useState(3);
  const [startTime, setStartTime] = React.useState(null);
  const [elapsedSeconds, setElapsedSeconds] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [wordShake, setWordShake] = React.useState(false);

  const fetchAndInitialize = () => {
    getDailyScrmbl((fetchedWord) => {
        const storedWord = localStorage.getItem('word');
        const storedGameOver = localStorage.getItem('gameOver');
        const storedElapsedSeconds = localStorage.getItem('elapsedSeconds');
        const storedGuess = localStorage.getItem('guess');

        if (storedGameOver === "true") {
            setGameOver(true);
            setElapsedSeconds(Number(storedElapsedSeconds));
            setWord(storedWord);
            setGuess(storedGuess);
        } else if (!storedWord || fetchedWord !== storedWord) {
            localStorage.clear();
            setWord(fetchedWord);
            setGuess('_'.repeat(fetchedWord.length));
        } else {
            setWord(storedWord);
            setGuess('_'.repeat(storedWord.length));
        }
    });
  };

  useEffect(fetchAndInitialize, []);

  useEffect(() => {
    if (gameOver && guess === word) {
        localStorage.setItem('gameOver', gameOver);
        localStorage.setItem('elapsedSeconds', elapsedSeconds.toString());
        localStorage.setItem('word', word);
        localStorage.setItem('guess', guess);
    }
  }, [gameOver, elapsedSeconds, word, guess]);

  const startClock = () => {
    setStartTime(new Date());
  };

  const scrmblWord = useCallback(() => {
    const characters = word.split('');
    for (let i = characters.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[randomIndex]] = [characters[randomIndex], characters[i]];
    }
    return characters.join('');
  }, [word]);

  useEffect(() => {
    setScrmbled(scrmblWord());
  }, [word, scrmblWord]);

  const addLetter = (letter) => {
    if (gameOver) return;

    const updatedGuess = guess.split('');
    const indexToReplace = updatedGuess.indexOf('_');
    if (indexToReplace === -1) return;

    updatedGuess[indexToReplace] = letter;
    const newGuess = updatedGuess.join('');
    setGuess(newGuess);
  }

  const removeLetter = () => {
    console.log('Removing letter')
    if (gameOver) return;
    const updatedGuess = guess.split('');
    for (let i = updatedGuess.length - 1; i >= 0; i--) {
        if (updatedGuess[i] !== '_') {
            updatedGuess[i] = '_';
            break;
        }
    }
    setGuess(updatedGuess.join(''));
  }

  const submitGuess = useCallback(() => {
    console.log('Submitting guess')
    console.log(word);
    console.log(guess);
    if (gameOver) return;
    if (guess === word) {
      const endTime = new Date();
      const timeDiff = endTime - startTime;
      const roundedSeconds = Math.round(timeDiff / 1000);
      setElapsedSeconds(roundedSeconds);
      setGameOver(true);
    } else {
      setWordShake(true);
      setGuess('_'.repeat(word.length));
      setTimeout(() => setWordShake(false), 500);
    }
  }, [gameOver, word, guess, startTime]);

  useEffect(() => {
    if (guess && guess.indexOf('_') === -1) {
      submitGuess();
    }
  }, [guess, submitGuess])

  const letterCountInGuess = (letter) => {
    return [...guess].filter(l => l === letter).length;
  };

  const countLetter = (letter, string) => {
    return [...string].filter(l => l === letter).length;
  };

  const unscrambleLetter = useCallback(() => {
    if (scrmblsLeft === 0) return;

    let unscrambledIndexes = [...correctIndexes];
    let availableIndexes = [...Array(word.length).keys()].filter(i => !unscrambledIndexes.includes(i));

    if (availableIndexes.length === 0) return;

    let randomScrambledIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    let letterAtScrambledIndex = scrmbled[randomScrambledIndex];
    let correctIndexForThisLetter = word.indexOf(letterAtScrambledIndex);

    unscrambledIndexes.push(correctIndexForThisLetter);
    setCorrectIndexes(unscrambledIndexes);

    let updatedScrambled = [...scrmbled];
    [updatedScrambled[randomScrambledIndex], updatedScrambled[correctIndexForThisLetter]] = [updatedScrambled[correctIndexForThisLetter], updatedScrambled[randomScrambledIndex]];

    let remainingIndexes = [...Array(word.length).keys()].filter(i => !unscrambledIndexes.includes(i));
    for (let i = remainingIndexes.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [updatedScrambled[remainingIndexes[i]], updatedScrambled[remainingIndexes[randomIndex]]] = [updatedScrambled[remainingIndexes[randomIndex]], updatedScrambled[remainingIndexes[i]]];
    }

    setScrmbled(updatedScrambled.join(''));
    setScrmblsLeft(prevScrmbls => prevScrmbls - 1); // Using function form to ensure correctness
  }, [word, scrmbled, scrmblsLeft, correctIndexes]);


  return (
    <Content>
      <Welcome
        active={helpActive}
        close={() => setHelpActive(false)}
        startClock={startClock}
        gameOver={gameOver}
      />
      <GameOver
        active={gameOver}
        scrmblsLeft={scrmblsLeft}
        elapsedSeconds={elapsedSeconds}
        word={word}
      />

      <Header>
        <Branding>
          <Logo src={scrmbl} alt="scrmbl" />
          <Title>Scrmbl</Title>
        </Branding>
      </Header>
      <ScrmblStyledWord text={scrmbled} size='40px' marginTop='auto' correct={correctIndexes}/>
      <ScrmblStyledWord text={guess} size='40px' marginTop='auto' shake={wordShake}/>
      <ScrmblContainer>
        <h1>{scrmblsLeft}</h1>
        <ScrmblButton
          onClick={unscrambleLetter}
          scrmblsLeft={scrmblsLeft}
        />
      </ScrmblContainer>
      <Keyboard
        addLetter={addLetter}
        removeLetter={removeLetter}
        submitGuess={submitGuess}
        word={word}
        guess={guess}
        letterCountInGuess={letterCountInGuess}
        countLetter={countLetter}
      />
      <KeyboardListener 
        addLetter={addLetter}
        removeLetter={removeLetter}
        submitGuess={submitGuess}
        word={word}
        letterCountInGuess={letterCountInGuess}
        countLetter={countLetter}
      />
    </Content>
  );
}

export default App;
