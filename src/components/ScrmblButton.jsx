import React, { useState, useEffect } from "react";
import styled from "styled-components";
import scrmbl from '../img/scrmbl.svg'

const ScrmblButtonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin: 16px auto 5px;
  background: #000000;
  border-radius: 50%;
  padding: 16px;
  border: 1px solid #ffffff;
  cursor: pointer;
  box-shadow: ${props => props.pressed ? "0 0 #ffffff" : "0 5px #ffffff"};
  transition: all 0.1s ease-in-out;
  transform: ${props => props.pressed ? "translateY(5px)" : "none"};
  width: 75px;
  height: 75px;
  opacity: ${props => props.disabled ? "0.5" : "1"};
  pointer-events: ${props => props.disabled ? "none" : "auto"};
`;

const ButtonText = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff55
`;

const ScrmblImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ScrmblButton = ({ onClick, scrmblsLeft }) => {
  const [cooldown, setCooldown] = useState(0);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (cooldown > 0) {
      const timerId = setTimeout(() => {
        setCooldown(prevCooldown => prevCooldown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [cooldown]);

  const handleClick = () => {
    if (cooldown === 0) {
      onClick();
      setCooldown(10);
    }
  }

  useEffect(() => {
    if (scrmblsLeft <= 0 || cooldown > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [scrmblsLeft, cooldown]);

  return (
    <ScrmblButtonContainer onClick={handleClick} pressed={cooldown > 0} disabled={disabled}>
      {cooldown > 0 ? <ButtonText>{cooldown}</ButtonText> : <ScrmblImg src={scrmbl} alt="scrmbl" />}
    </ScrmblButtonContainer>
  );
}

export default ScrmblButton;