import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import SearchField from './SearchField';

const TopBar = () => {
  return (
    <Container>
      <LogoText>LEVYKAUPPA-Y</LogoText>
      <GreenBar>
        <HeaderNavLink to="/">ETUSIVU</HeaderNavLink>
        <HeaderNavLink to="/records/all">LEVYT</HeaderNavLink>
      </GreenBar>
      <WhiteBar>
        <SearchField />
      </WhiteBar>
    </Container>
  );
};

const Container = styled.div``;

const WhiteBar = styled.div`
  background-color: ${(props) => props.theme.white};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GreenBar = styled.div`
  background-color: ${(props) => props.theme.green};
  height: 50px;
  display: flex;
  align-items: center;
`;

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  margin: 0px 20px;
`;

const LogoText = styled.h1`
  color: ${(props) => props.theme.green};
  font-size: 64px;
  font-weight: 900;
  margin-bottom: -15px;
  margin-top: 0px;
`;

export default TopBar;
