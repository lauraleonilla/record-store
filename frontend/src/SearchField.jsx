import React from 'react';
import styled from 'styled-components';

const SearchField = () => {
  return (
    <StyledSearchField>
      <p>Hae artistia tai albumia...</p>
    </StyledSearchField>
  );
};

const StyledSearchField = styled.div`
  background-color: ${(props) => props.theme.white};
  height: 32px;
  width: 500px;
  position: relative;
  border-radius: 5px;
  box-shadow: -1px 1px 6px 0px rgba(0, 0, 0, 0.75) inset;
`;

export default SearchField;
