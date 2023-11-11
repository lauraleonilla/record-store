import { pool } from "../../index.js";

export const getCategories = async (req, res) => {
  try {
    const client = await pool.connect();
    const query = {
      text: "SELECT * FROM categories;",
    };
    const data = await client.query(query);
    res.send(data.rows).status(200);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
};
