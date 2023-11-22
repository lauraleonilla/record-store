import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AlbumContainer } from '../components/AlbumContainer';
import { createCards } from '../hooks/useAlbumData';

export default function Home() {
  const [albumCards, setAlbumCards] = useState();

  useEffect(() => {
    async function getAlbumData() {
      try {
        const res = await fetch('http://localhost:3001/albums/newreleases', {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        });
        if (res.ok) {
          const albumData = await res.json();
          const cards = await createCards(albumData);
          setAlbumCards(cards);
        }
      } catch (err) {
        console.log('failed to get data: ', err);
      }
    }
    getAlbumData();
  }, []);

  return (
    <HomeContainer>
      <Homebanner>Musiikkia jokaiseen makuun!</Homebanner>
      <HomeContent>
        <HomeHeaderContainer>
          <HomeHeader>Viikon uutuudet</HomeHeader>
        </HomeHeaderContainer>
        <ModifiedAlbumContainer>{albumCards}</ModifiedAlbumContainer>;
      </HomeContent>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  min-width: 100%;
`;

const Homebanner = styled.div`
  background: ${(props) => props.theme.white};
  padding: 2.5rem;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  box-shadow: ${(props) => props.theme.shadows.smallAroundLight};
`;

const HomeContent = styled.div`
  box-shadow: ${(props) => props.theme.shadows.smallAroundLight};
`;

const HomeHeaderContainer = styled.div`
  padding: 3rem 0 2rem 0;
  background: ${(props) => props.theme.lightGrey};
`;

const HomeHeader = styled.div`
  font-size: 2rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: ${(props) => props.theme.shadows.smallAroundLight};
  background: ${(props) => props.theme.white};
`;

const ModifiedAlbumContainer = styled(AlbumContainer)`
  box-shadow: none;
`;
