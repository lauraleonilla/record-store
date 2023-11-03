import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import BackgroundImage from './assets/albums.jpg';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './assets/globalStyles';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001';
    const fetchData = async () => {
      const response = await axios.get(apiUrl);
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <TopBar />
        <h1>{data}</h1>
      </StyledApp>
    </ThemeProvider>
  );
};

const StyledApp = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
`;

export default App;
