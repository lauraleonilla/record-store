import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { SearchContext } from './context/AlbumSearchContext.jsx';
import { useNavigate } from 'react-router-dom';

const SearchField = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const { updateResults } = useContext(SearchContext);
  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/albums/search`;
    const fetchData = async () => {
      let trimmedSearchTerm = searchTerm.replace(/\s+/g, ' ').trim();
      try {
        const response = await axios.post(apiUrl, { trimmedSearchTerm });
        updateResults(response.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    if (searchTerm && searchTerm.length > 1) {
      const debounce = setTimeout(() => {
        fetchData();
      }, 1000);
      return () => clearTimeout(debounce);
    } else {
      updateResults('');
    }
  }, [searchTerm]);

  function handleSearch(e) {
    if (e.key === 'Enter' && !window.location.pathname.endsWith('/search')) {
      navigate('/search');
    }
  }

  function handleSearchClick() {
    if (!window.location.pathname.endsWith('/search')) {
      navigate('/search');
    }
  }

  return (
    <SearchWrapper>
      <StyledSearchField
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
        placeholder="Hae artistia tai albumia. Hae painamalla 'Enter'"
      />
      <SearchButton onClick={handleSearchClick}>Hae</SearchButton>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div`
  display: flex;
  height: 2rem;
  gap: 0.25rem;
`;

const StyledSearchField = styled.input`
  background-color: ${(props) => props.theme.white};
  width: 500px;
  border-radius: 5px;
  box-shadow: -1px 1px 5px -1px rgba(0, 0, 0, 0.75) inset;
  padding-left: 10px;
  border: ${(props) => props.theme.grey} solid 1px;
`;

const SearchButton = styled.button`
  padding: 0 1rem;
  border-radius: 5px;
  border: solid 1px ${(props) => props.theme.grey};
  background: #ddd;
  box-shadow: grey 1px 1px 2px 0px;
  transition: 50ms ease-out;
  &:hover {
    transition: 50ms ease-in;
    background: ${(props) => props.theme.lightGrey};
  }
  &:active {
    background: white;
  }
`;

export default SearchField;
