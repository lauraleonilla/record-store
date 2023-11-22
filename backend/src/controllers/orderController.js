import { pool } from "../../index.js";

export async function saveOrder(req, res) {
  const client = await pool.connect();
  const { firstName, lastName, email, phoneNumber, items, deliveryMethod } =
    req.body;
  console.log("BÖDYYYY", req.body);
  const price = 10;
  try {
    const query = {
      text: "INSERT INTO orders (firstname, lastname, email, phonenum, ordereditems, totalprice, delivery_method) VALUES ($1, $2, $3, $4, $5, $6, $7);",
      values: [
        firstName,
        lastName,
        email,
        phoneNumber,
        items,
        price,
        deliveryMethod,
      ],
    };
    const data = await client.query(query);
    console.log("LÖÖÖL", data);
    res.send(data).status(200);
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}
