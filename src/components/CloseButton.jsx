import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px #00000022;
  border-radius: 50%;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 32px;
  color: #ffffff;
`;

const CloseButton = ({ close }) => {
  return (
    <Container onClick={close}>
      <Icon icon={faCircleXmark}/>
    </Container>
  )
}

export default CloseButton;