import { pool } from "../../api/index.js";

export async function getNewReleases(req, res) {
  const client = await pool.connect();
  const currentDate = new Date();
  const prevDate = new Date(currentDate - 31 * (24 * 60 * 60 * 1000));
  try {
    const query = {
      text: "SELECT albumName, artistName, productType, albumimage, price FROM albums WHERE releaseDate > $1",
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
  const { itemIndex, itemsPerPage } = req.body;
  try {
    const query = {
      text: "SELECT albumName, artistName,productType, albumimage, price FROM albums OFFSET $1 LIMIT $2",
      values: [itemIndex, itemsPerPage],
    };
    const count = await client.query("SELECT COUNT(*) FROM albums");
    const countNum = count.rows[0].count;
    const data = await client.query(query);
    const albumData = data.rows;
    res
      .send(JSON.stringify({ itemCount: countNum, albumData: albumData }))
      .status(200);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

export const searchAlbums = async (req, res) => {
  let client = null;
  const searchTerm = req?.body?.trimmedSearchTerm;
  try {
    client = await pool.connect();
  } catch (error) {
    console.log("A client pool error occurred:", error);
    return error;
  }
  const query = {
    text: "SELECT * FROM albums WHERE albumName ILIKE $1 OR artistname ILIKE $1 OR recordlabel LIKE $1",
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

export const getAlbumsByGenre = async (req, res) => {
  const client = await pool.connect();
  const { itemIndex, itemsPerPage } = req.body;
  const { genre } = req.params;

  try {
    const query = {
      text: "SELECT * FROM albums WHERE category = $1 OFFSET $2 LIMIT $3",
      values: [genre, itemIndex, itemsPerPage],
    };
    const count = await client.query(
      "SELECT COUNT(*) FROM albums WHERE category = $1",
      [genre]
    );
    const countNum = count.rows[0].count;
    const data = await client.query(query);
    const albumData = data.rows;
    res
      .send(JSON.stringify({ itemCount: countNum, albumData: albumData }))
      .status(200);
    client.release();
  } catch (error) {
    console.error("Error getting albums by genre:", error);
    res.status(500).send("Error getting albums by genre");
  }
};
