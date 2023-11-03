import React from 'react';
import styled from 'styled-components';

const TopBar = () => {
  return (
    <Container>
      <LogoText>LEVYKAUPPA Y</LogoText>
      <GreenBar />
      <WhiteBar />
    </Container>
  );
};

const Container = styled.div`
  height: 100px;
`;

const WhiteBar = styled.div`
  background-color: ${(props) => props.theme.white};
  height: 50px;
`;
const GreenBar = styled.div`
  background-color: ${(props) => props.theme.green};
  height: 50px;
`;

const LogoText = styled.h1`
  color: ${(props) => props.theme.green};
  font-size: 64px;
  font-weight: bold;
`;

export default TopBar;
