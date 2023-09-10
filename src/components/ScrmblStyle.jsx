import React from "react";
import styled, { css, keyframes } from "styled-components";

const shakeAnimation = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`

const ScrmblStyleContainer = styled(({ shake, marginTop, ...rest }) => <div {...rest} />)`
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
  ${props => props.shake && css`
    animation: ${shakeAnimation} 0.5s cubic-bezier(.36,.07,.19,.97) both;
  `}
`;

const StyledLetter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.correct ? '#dfba3c' : null};
  color: ${props => props.correct ? '#000000' : '#ffffff'};
  margin: 2px;
  font-size: ${props => props.size ? props.size : '18px'};
  width: 2.5rem;
  height: 3rem;
  padding: 8px;
  border-radius: 5px;
`;

const ScrmblStyleLetter = ({ correct, children, size }) => <StyledLetter size={size} correct={correct}>{children}</StyledLetter>;

const ScrmblStyledWord = ({ text, correct, size, marginTop, shake }) => {
  return (
    <ScrmblStyleContainer marginTop={marginTop} shake={shake}>
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