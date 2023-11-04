import React, { useState, useEffect } from 'react';

import axios from 'axios';
import './App.css';
import TopBar from './TopBar';
import BackgroundImage from './assets/albums.jpg';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './assets/globalStyles';
import Footer from './Footer';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001';
    const fetchData = async () => {
      const response = await axios.get(apiUrl);
      setData(response.data);
      console.log('Hello from API:', data);
    };
    fetchData();
  }, [data]);

  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <TopBar />
        <Footer />
      </StyledApp>
    </ThemeProvider>
  );
};

const StyledApp = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
`;

export default App;
