import { createGlobalStyle } from 'styled-components';

export const theme = {
  green: '#8CC084',
  white: '#FFFFFF',
  black: '#000000'
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
