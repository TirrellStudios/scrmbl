import { motion } from 'framer-motion';
import styled from "styled-components";

const DialogBox = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background: #000000;
  border-radius: 25px;
  margin: auto;
  box-shadow: 0 0 10px #00000022;
  border: 2px solid #ffffff;
  height: 100%;
  max-height:750px;
  width: 100%;
  max-width: 550px;
  overflow: hidden;
`;

const Dialog = ({children}) =>
  <DialogBox
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}>
    {children}
  </DialogBox>

export default Dialog;