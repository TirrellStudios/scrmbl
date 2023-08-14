import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from 'framer-motion';
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
  background: #000000dd;
  z-index: 100;
`;

const RulesContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000000;
  border-radius: 25px;
  margin: auto;
  width: 500px;
  box-shadow: 0 0 10px #00000022;
  border: 2px solid #ffffff;
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
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 16px;
  width: 80%;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
`;

const ListItem = styled.li`
  text-align: center;
  list-style: none;
  font-weight: 400;
  margin: 8px 0;
`;

const LetsPlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dfba3c;
  color: #000000;
  font-size: 18px;
  font-weight: 700;
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  margin: 16px;
  cursor: pointer;
  box-shadow: 0 0 10px #00000022;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px #00000022;
  }
`;

const Welcome = ({ active, close, startClock, gameOver }) => {
  if (gameOver) return;
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
          <Heading>How to play:</Heading>
          <List>
            <ScrmblStyledWord text='CMSBRL' size='32px' />
            <ListItem>🎯 Challenge: Turn this jumbled mess into a real word!</ListItem>
            
            <ScrmblStyledWord text='LSRCMB' size='32px' correct={[2]} />
            <ListItem>💡 Need a hint? Tap the Scrmbl button and watch a letter slide into its rightful place!</ListItem>
            
            <ScrmblStyledWord text='SLRMCB' size='32px' correct={[0, 2, 3]} />
            <ListItem>🕹 Use the Scrmbl magic three times! But remember, each hint is less bragging rights.</ListItem>
            
            <ScrmblStyledWord text='SCRMBL' size='32px' correct={[0, 1, 2, 3, 4, 5]} />
            <ListItem>🎉 Crack the word, be the Scrmbl champ, and dance your way to a perfect score!</ListItem>
            
            <LetsPlayButton onClick={() => {
              close();
              startClock();
            }}>
              🚀 Dive In & Play!
            </LetsPlayButton>
          </List>
        </RulesContainer>
      </WelcomeContainer>}
    </AnimatePresence>
  );
};

export default Welcome;