import { createGlobalStyle } from 'styled-components';

export const theme = {
  green: '#8CC084',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#808080',
  lightGrey: '#F2F2F2'
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
