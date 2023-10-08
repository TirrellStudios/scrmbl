import React from "react";
import styled from "styled-components";
import ScrmblStyledWord from "./ScrmblStyle";
import Dialog from "./Dialog";

const Heading = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  border-bottom: 2px solid #ffffff;
`;

const List = styled.ul`
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
`;

const ListItem = styled.li`
  text-align: center;
  list-style: none;
  font-weight: 400;
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
  cursor: pointer;
  box-shadow: 0 0 10px #00000022;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 10px #00000022;
  }
`;

const Welcome = ({ close, startClock }) => {
  return (
    <Dialog>
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
          console.log("YOOOOO")
          close();
          startClock();
        }}>
          🚀 Dive In & Play!
        </LetsPlayButton>
      </List>
    </Dialog>
  );
};

export default Welcome;