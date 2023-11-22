import { pool } from "../../index.js";

export async function saveOrder(req, res) {
  const client = await pool.connect();
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
