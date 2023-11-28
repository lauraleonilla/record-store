import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import SearchField from './SearchField';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const TopBar = () => {
  const { user, updateUser } = useContext(UserContext);
  return (
    <Container>
      <GreenBar>
        <HeaderNavLink to="/">ETUSIVU</HeaderNavLink>
        <HeaderNavLink to="/records/1">LEVYT</HeaderNavLink>
        <Usertext>{user}</Usertext>
        {user ? (
          <LoginNavLink onClick={() => updateUser(null)}>KIRJAUDU ULOS</LoginNavLink>
        ) : (
          <LoginNavLink to="/user/login">KIRJAUDU SISÄÄN</LoginNavLink>
        )}
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

// height: 50px;
const WhiteBar = styled.div`
  background-color: ${(props) => props.theme.lightGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;
// height: 50px;
const GreenBar = styled.div`
  background-color: ${(props) => props.theme.ashGrey};
  display: flex;
  align-items: center;
  padding: 0.75rem;
`;

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
  margin: 0px 20px;
`;

const LoginNavLink = styled(NavLink)`
  text-decoration: none;
  margin-left: auto;
  margin-right: 20px;
`;

const Usertext = styled.span`
  margin-left: auto;
  margin-right: 10px;
`;

export default TopBar;
