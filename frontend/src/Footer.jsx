import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Container>
      <LinkWrapper>
        <FooterNavLink to="/">Etusivu</FooterNavLink>
        <FooterNavLink to="/records">Levyt</FooterNavLink>
        <FooterNavLink to="/login">Kirjaudu sisään</FooterNavLink>
      </LinkWrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 100px;
  background-color: ${(props) => props.theme.grey};
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const FooterNavLink = styled(NavLink)`
  text-decoration: none;
  margin: 5px 20px;
  color: ${(props) => props.theme.white};
`;

export default Footer;
