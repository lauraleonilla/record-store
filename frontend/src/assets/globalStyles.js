import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

// green: '#8CC084',
// cadetGrey: '#97ABB1',

export const theme = {
  ashGrey: '#85A4C7',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#808080',
  midGrey: '#C0C0C0',
  lightGrey: '#F2F2F2',
  darkOrange: 'HSL(23, 100%, 50%)',
  orange: 'HSL(23, 100%, 65%)',
  lightOrange: 'HSL(23, 100%, 70%)',
  extraLightOrange: 'HSL(23, 100%, 85%)',
  red: '#ff0000',
  shadows: {
    smallAroundLight: '#aaa 0px 0px 10px 1px',
    smallAroundDark: '#555 0px 0px 10px 1px',
    smallBottom: '#444 0px 3px 15px 0px'
  }
};

export const Header2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const StandardBold = styled.p`
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Standard = styled.p`
  margin-bottom: 10px;
`;

export const GlobalStyle = createGlobalStyle`
* {
    font-family: Lato;
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    color: ${theme.black};
  }
`;
