import React from 'react';
import './App.css';
import TopBar from './TopBar';
import BackgroundImage from './assets/albums.jpg';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './assets/globalStyles';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer';
import Home from './pages/Home';
import { CartProvider } from './context/Cart/CartContext';
import { CatalogPage } from './pages/CatalogPage';
import { AlbumSearch } from './pages/Search';
import { FilteredCategory } from './pages/FilterCategories';
import { Checkout } from './components/Checkout';
import { SearchProvider } from './context/AlbumSearchContext';
import RecordsLayout from './components/RecordsLayout';
// import { BodyWrapper } from './components/BodyWrapper,';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <GlobalStyle />
        <SearchProvider>
          <Header>
            <LogoText>LEVYKAUPPA-Y</LogoText>
          </Header>
          <TopBar />
          <CartProvider>
            {/* <BodyWrapper> */}
            <Routes>
              <Route element={<RecordsLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="records">
                  <Route path=":page" element={<CatalogPage />} />
                </Route>
                <Route path="search" element={<AlbumSearch />} />
                <Route path="/genre/:categoryName" element={<FilteredCategory />} />
              </Route>
              <Route path="checkout" element={<Checkout />} />
            </Routes>
            {/* </BodyWrapper> */}
          </CartProvider>
        </SearchProvider>
        <Footer />
      </StyledApp>
    </ThemeProvider>
  );
};

const StyledApp = styled.div`
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-attachment: fixed;
  height: fit-content;
`;

const Header = styled.div`
  background: RGBA(25, 25, 35, 75%);
  z-index: 1;
`;

const LogoText = styled.h1`
  color: ${(props) => props.theme.ashGrey};
  margin-bottom: -18px;
  font-size: 4rem;
  font-weight: 900;
  margin-top: -12px;
  margin-left: 0.5rem;
`;

export default App;
