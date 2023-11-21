import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import SearchField from './SearchField';

const TopBar = () => {
  return (
    <Container>
      <LogoBg>
        <LogoText>LEVYKAUPPA-Y</LogoText>
      </LogoBg>
      <GreenBar>
        <HeaderNavLink to="/">ETUSIVU</HeaderNavLink>
        <HeaderNavLink to="/records/1">LEVYT</HeaderNavLink>
      </GreenBar>
      <WhiteBar>
        <SearchField />
      </WhiteBar>
    </Container>
  );
};

const Container = styled.div`
  box-shadow: ${(props) => props.theme.shadows.smallBottom};
  position: sticky;
  top: 0;
`;

const WhiteBar = styled.div`
  background-color: ${(props) => props.theme.lightGrey};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GreenBar = styled.div`
  background-color: ${(props) => props.theme.ashGrey};
  height: 50px;
  display: flex;
  align-items: center;
`;

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  margin: 0px 20px;
`;

const LogoBg = styled.div`
  background: RGBA(25, 25, 35, 75%);
`;

const LogoText = styled.h1`
  color: ${(props) => props.theme.ashGrey};
  margin-bottom: -18px;
  font-size: 64px;
  font-weight: 900;
  margin-top: -12px;
  margin-left: 0.5rem;
`;

export default TopBar;
