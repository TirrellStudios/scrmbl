import React from "react";
import styled from "styled-components";

const ScrmblStyleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  margin-top: ${props => props.marginTop ? props.marginTop : '0'};
  background: #333;
  border-radius: 5px;
  padding: 8px;
`;

const StyledLetter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.correct ? '#dfba3c' : null};
  color: ${props => props.correct ? '#000000' : '#ffffff'};
  margin: 2px;
  font-size: ${props => props.size ? props.size : '18px'};
  width: 50px;
  height: 50px;
  padding: 8px;
  border-radius: 5px;
`;

const ScrmblStyleLetter = ({ correct, children, size }) => <StyledLetter size={size} correct={correct}>{children}</StyledLetter>;

const ScrmblStyledWord = ({ text, correct, size, marginTop }) => {
  return (
    <ScrmblStyleContainer marginTop={marginTop}>
      {text.split('').map((char, index) => {
        if (correct && correct.includes(index)) {
          return <ScrmblStyleLetter size={size} key={index} correct>{char}</ScrmblStyleLetter>
        }
        return <ScrmblStyleLetter size={size} key={index}>{char}</ScrmblStyleLetter>
      })}
    </ScrmblStyleContainer>
  );
}

export default ScrmblStyledWord;