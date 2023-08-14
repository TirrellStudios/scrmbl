import React, { useState } from "react";
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
  box-shadow: 0 5px #ffffff;
  transition: all 0.1s ease-in-out;
  &:active {
    transform: translateY(5px);
    box-shadow: 0 0 #ffffff;
  }
`;

const ButtonOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;
  pointer-events: none;
`;

const Logo = styled.img`
  width: 70px;
  height: 70px;
`;

const ScrmblButton = ({ onClick }) => {
  const [pressed] = useState(false);

  return (
    <ScrmblButtonContainer onClick={onClick}>
      <ButtonOverlay pressed={pressed} />
      <Logo src={scrmbl} alt="scrmbl" />
    </ScrmblButtonContainer>
  );
}

export default ScrmblButton;