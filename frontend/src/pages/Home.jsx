import React, { useEffect, useState } from 'react';
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

  return <AlbumContainer>{albumCards}</AlbumContainer>;
}
