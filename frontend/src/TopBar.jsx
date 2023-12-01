import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import SearchField from './SearchField';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

const TopBar = () => {
  const { user, logoutUser } = useContext(UserContext);
  return (
    <Container>
      <GreenBar>
        <Navlinks>
          <HeaderNavLink to="/">ETUSIVU</HeaderNavLink>
          <HeaderNavLink to="/records/1">LEVYT</HeaderNavLink>
        </Navlinks>
        <UserControls>
          <Usertext>{user}</Usertext>
          {user ? (
            <>
              <LoginNavLink to="/user/profile">PROFIILI</LoginNavLink>
              <LoginNavLink onClick={() => logoutUser(null)}>KIRJAUDU ULOS</LoginNavLink>
            </>
          ) : (
            <LoginNavLink to="/user/login">KIRJAUDU SISÄÄN</LoginNavLink>
          )}
        </UserControls>
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
  justify-content: space-between;
  padding: 0.75rem 2rem;
`;
const Navlinks = styled.div`
  display: flex;
  gap: 2rem;
`;
const UserControls = styled.div`
  display: flex;
  gap: 1rem;
`;

const HeaderNavLink = styled(NavLink)`
  text-decoration: none;
`;

const LoginNavLink = styled(NavLink)`
  text-decoration: none;
`;

const Usertext = styled.span`
  margin-top: auto;
  font-size: 0.85rem;
`;

export default TopBar;
