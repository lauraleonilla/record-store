import { pool } from '../../index.js';

export async function getNewReleases(req, res) {
  const client = await pool.connect();
  const currentDate = new Date();
  const prevDate = new Date(currentDate - 7 * (24 * 60 * 60 * 1000));
  try {
    const query = {
      text: 'SELECT albumName, artistName,productType, price FROM albums WHERE releaseDate > $1',
      values: [prevDate],
    };
    const data = await client.query(query);
    res.send(JSON.stringify(data.rows)).status(200);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

export async function getAllAlbums(req, res) {
  const client = await pool.connect();
  try {
    const data = await client.query(
      'SELECT albumName, artistName, productType, price FROM albums'
    );
    res.send(JSON.stringify(data.rows)).status(200);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}
