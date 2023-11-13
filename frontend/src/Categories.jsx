import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const apiUrl = 'http://localhost:3001/main/categories';
    const fetchCategories = async () => {
      try {
        const response = await axios.get(apiUrl);
        setCategories(response.data);
      } catch (error) {
        console.error('Error: ', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContainer>
      {categories?.length
        ? categories.map((category, index) => {
            return (
              <CategoryCard key={index}>
                <p>{category.categoryname}</p>
              </CategoryCard>
            );
          })
        : null}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  background-color: ${(props) => props.theme.lightGrey};
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const CategoryCard = styled.div`
  background-color: ${(props) => props.theme.white};
  height: 40px;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.grey};
`;

export default Categories;
