import { useState, useEffect, useContext } from 'react';
import AlbumCard from '../components/AlbumCard';
import { PaginationContext } from '../context/PaginationContext';

export function createCards(albumData) {
  const cards = albumData.map(
    ({ albumname, artistname, producttype, price, albumimage } = albumData, i) => {
      return (
        <AlbumCard
          key={i}
          albumName={albumname}
          artist={artistname}
          productType={producttype}
          price={price}
          albumimage={albumimage}
        />
      );
    }
  );
  return cards;
}
export default function useAlbumData(urlString, pageIndex) {
  const [albumCards, setAlbumCards] = useState();
  const { itemsPerPage, updateItemCount } = useContext(PaginationContext);
  const itemIndex = itemsPerPage * (pageIndex - 1);

  useEffect(() => {
    async function getAlbumData() {
      try {
        const res = await fetch(`http://localhost:3001/albums/${urlString}`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ itemIndex: itemIndex, itemsPerPage: itemsPerPage })
        });
        if (res.ok) {
          const data = await res.json();
          const cards = await createCards(data.albumData);
          updateItemCount(data.itemCount);
          setAlbumCards(cards);
        }
      } catch (err) {
        console.log('failed to get data: ', err);
      }
    }
    getAlbumData();
  }, [urlString, pageIndex]);

  return albumCards;
}
