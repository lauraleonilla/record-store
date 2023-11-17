import { createGlobalStyle } from 'styled-components';

export const theme = {
  green: '#8CC084',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#808080',
  lightGrey: '#F2F2F2',
  darkOrange: 'HSL(23, 100%, 50%)',
  orange: 'HSL(23, 100%, 65%)',
  lightOrange: 'HSL(23, 100%, 70%)',
  extraLightOrange: 'HSL(23, 100%, 85%)',
  shadows: {
    smallAround: '#aaa 0 0 3px 1px'
  }
};

export const GlobalStyle = createGlobalStyle`
* {
    font-family: Roboto Flex;
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    color: ${theme.black};
  }
`;

export const effects = {
  softShadow: 'black 0 0 2px 2px'
};
