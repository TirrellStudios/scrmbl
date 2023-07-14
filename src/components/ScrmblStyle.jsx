import React from "react";
import styled from "styled-components";

const ScrmblStyleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin: 2px;
  border: 1px solid #ffffff;
`;

const StyledLetter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: ${props => props.correct ? '#dfba3c' : '#000000'};
  color: ${props => props.correct ? '#000000' : '#ffffff'};
  margin: 2px;
`;

const ScrmblStyleLetter = ({ correct, children }) => <StyledLetter correct={correct}>{children}</StyledLetter>;

const ScrmblStyledWord = ({ text, correct }) => {
  return (
    <ScrmblStyleContainer>
      {text.split('').map((char, index) => {
        if (correct && correct.includes(index)) {
          return <ScrmblStyleLetter key={index} correct>{char}</ScrmblStyleLetter>
        }
        return <ScrmblStyleLetter key={index}>{char}</ScrmblStyleLetter>
      })}
    </ScrmblStyleContainer>
  );
}

export default ScrmblStyledWord;