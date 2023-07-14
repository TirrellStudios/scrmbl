import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from 'framer-motion';
import CloseButton from "./CloseButton";
import ScrmblStyledWord from "./ScrmblStyle";

const WelcomeContainer = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #00000088;
`;

const RulesContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 600px;
  background: #000000;
  border-radius: 25px;
  margin: auto;
  box-shadow: 0 0 10px #00000022;
`;

const Heading = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin: 16px;
  border-bottom: 2px solid #ffffff;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  width: 80%;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
`;

const ListItem = styled.li`
  font-weight: 400;
  margin: 8px 0;
`;

const Welcome = ({ active, close }) => {
  return (
    <AnimatePresence>
      {active && 
      <WelcomeContainer
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <RulesContainer>
          <CloseButton close={close} />
          <Heading>How to play:</Heading>
          <List>
            <ScrmblStyledWord text='CMSBRL' />
            <ListItem>The goal is to unscramble the word</ListItem>
            <ScrmblStyledWord text='LSRCMB' correct={[2]} />
            <ListItem>Press the Scrmbl button to reveal a letter in the word</ListItem>
            <ScrmblStyledWord text='SLRMCB' correct={[0, 2, 3]} />
            <ListItem>You can use the Scrmbl button 3 times, but they go against your final score</ListItem>
            <ScrmblStyledWord text='SCRMBL' correct={[0, 1, 2, 3, 4, 5]} />
            <ListItem>Finish the word for the best score</ListItem>
          </List>
        </RulesContainer>
      </WelcomeContainer>}
    </AnimatePresence>
  );
};

export default Welcome;