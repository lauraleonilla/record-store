import { pool } from "../../index.js";

export const getCategories = async (req, res) => {
  let client = null;
  try {
    client = await pool.connect();
  } catch (error) {
    console.log("A client pool error occurred:", error);
    return error;
  }
  try {
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