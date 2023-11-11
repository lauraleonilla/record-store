import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Categories = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/genres';
    const fetchGenres = async () => {
      try {
        const response = await axios.get(apiUrl);
        console.log('HEELLOO', response);
        setGenres(response.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    fetchGenres();
  }, []);

  return (
    <CategoryContainer>
      {genres?.length
        ? genres.map((genre, index) => {
            return (
              <CategoryCard key={index}>
                <p>{genre.categoryname}</p>
              </CategoryCard>
            );
          })
        : null}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  background-color: ${(props) => props.theme.lightGrey};
  width: 280px;
  display: flex;
  flex-direction: column;
  jsutify-content: center;
  align-items: center;
  padding: 30px;
`;

const CategoryCard = styled.div`
  background-color: ${(props) => props.theme.white};
  height: 40px;
  width: 250px;
`;

export default Categories;
