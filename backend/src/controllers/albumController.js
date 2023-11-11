import { pool } from "../../index.js";

export async function getNewReleases(req, res) {
  const client = await pool.connect();
  const currentDate = new Date();
  const prevDate = new Date(currentDate - 7 * (24 * 60 * 60 * 1000));
  try {
    const query = {
      text: "SELECT albumName, artistName,productType, price FROM albums WHERE releaseDate > $1",
      values: [prevDate],
    };
    const data = await client.query(query);
    res.send(data.rows).status(200);
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
      "SELECT albumName, artistName, productType, price FROM albums"
    );
    res.send(JSON.stringify(data.rows)).status(200);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

export const searchAlbums = async (req, res) => {
  let client = null;
  const searchTerm = req?.body?.searchTerm;
  try {
    client = await pool.connect();
  } catch (error) {
    console.log("A client pool error occurred:", error);
    return error;
  }
  const query = {
    text: "SELECT * FROM albums WHERE albumname LIKE $1 OR artistname LIKE $1 OR recordlaber LIKE $1",
    values: ["%" + searchTerm + "%"],
  };
  try {
    const response = await client.query(query);
    res.send(response.rows);
  } catch (err) {
    console.error("Error fetching the albums table", err);
  } finally {
    client.release();
  }
};
