import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/search';
    const fetchData = async () => {
      const response = await axios.post(apiUrl, { searchTerm });
      console.log('Data', response);
    };
    if (searchTerm && searchTerm.length > 2) {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <StyledSearchField
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Hae artistia tai albumia..."
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
