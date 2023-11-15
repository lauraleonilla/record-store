import { useState, useEffect } from 'react';
import AlbumCard from '../components/AlbumCard';

export function createCards(albumData) {
  const cards = albumData.map(({ albumname, artistname, producttype, price } = albumData, i) => {
    return (
      <AlbumCard
        key={i}
        albumName={albumname}
        artist={artistname}
        productType={producttype}
        price={price}
      />
    );
  });
  return cards;
}
export default function useAlbumData(urlString) {
  const [albumCards, setAlbumCards] = useState();

  useEffect(() => {
    async function getNewReleases() {
      try {
        const res = await fetch(`http://localhost:3001/albums/${urlString}`, {
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
        console.log('failed to get data', err);
      }
    }
    getNewReleases();
  }, [urlString]);

  return albumCards;
}
