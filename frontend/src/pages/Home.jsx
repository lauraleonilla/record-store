import styled from 'styled-components';
import AlbumCard from '../components/AlbumCard';
import { useEffect, useState } from 'react';

const albumData = [
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 },
  { title: 'title', artist: 'artist', type: 'type', price: 20 }
];

function createCards() {
  const cards = albumData.map((album, i) => {
    return (
      <AlbumCard
        key={i}
        albumName={album.title}
        artist={album.artist}
        productType={album.type}
        price={album.price}
      />
    );
  });
  return cards;
}

function date() {
  const date = new Date();
  const isoDate = date.toISOString();
  const YMD = isoDate.split('T')[0];
  const currentDate = new Date(YMD);
  console.log(currentDate);
}

export default function Home() {
  useEffect(() => {
    date();
  }, []);

  const [albumCards, setAlbumCards] = useState();

  useEffect(() => {
    setAlbumCards(createCards());
  }, []);

  return <AlbumsContainer>{albumCards}</AlbumsContainer>;
}

const AlbumsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3rem;
  padding: 2rem;
  background: #eee;
  max-width: 50%;
`;
