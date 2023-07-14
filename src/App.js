import React from 'react';
import styled from 'styled-components';
import Welcome from './components/Welcome';
import scrmbl from './img/scrmbl.svg'
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 512px;
  height: 100vh;
  background: #333;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  padding: 16px;
  background: #000;
`;

const Branding = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const HelpIcon = styled(FontAwesomeIcon)`
  font-size: 32px;
  margin-right: 8px;
  cursor: pointer;
`;

function App() {
  const [helpActive, setHelpActive] = React.useState(true);

  return (
    <Content>
      <Welcome active={helpActive} close={() => setHelpActive(false)} />
      <Header>
        <Branding>
          <Logo src={scrmbl} alt="scrmbl" />
          <Title>Scrmbl</Title>
        </Branding>
        <HelpIcon
          icon={faCircleQuestion}
          onClick={() => setHelpActive(true)}
        />
      </Header>
    </Content>
  );
}

export default App;
