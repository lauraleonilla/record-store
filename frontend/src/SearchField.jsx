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
    const apiUrl = 'http://localhost:3001/albums/search';
    const fetchData = async () => {
      try {
        const response = await axios.post(apiUrl, { searchTerm });
        updateResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    if (searchTerm && searchTerm.length > 0) {
      fetchData();
    }
  }, [searchTerm]);

  function handleSearch(e) {
    if (e.key === 'Enter' && !window.location.pathname.endsWith('records/search')) {
      navigate('/records/search');
    }
  }

  return (
    <StyledSearchField
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => handleSearch(e)}
      placeholder="Hae artistia tai albumia. Hae painamalla 'Enter'"
    />
  );
};

const StyledSearchField = styled.input`
  background-color: ${(props) => props.theme.white};
  height: 32px;
  width: 500px;
  border-radius: 5px;
  box-shadow: -2px 0px 6px -1px rgba(0, 0, 0, 0.75) inset;
  padding-left: 10px;
`;

export default SearchField;
