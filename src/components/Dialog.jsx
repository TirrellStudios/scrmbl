import { motion } from 'framer-motion';
import styled from "styled-components";

const InputBlocker = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #000000dd;
  z-index: 99;
`;

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

export const Dialog = ({children}) =>
  <InputBlocker
    initial={{ opacity: 0}}
    animate={{ opacity: 1}}
    exit={{ opacity: 0}}>
    <DialogBox
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      {children}
    </DialogBox>
  </InputBlocker>

export default Dialog;