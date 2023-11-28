import { pool } from "../../api/index.js";

export async function saveOrder(req, res) {
  const client = await pool.connect();
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    items,
    totalPrice,
    deliveryMethod,
  } = req.body;

  try {
    const query = {
      text: "INSERT INTO orders (firstname, lastname, email, phonenum, ordereditems, totalprice, delivery_method) VALUES ($1, $2, $3, $4, $5, $6, $7);",
      values: [
        firstName,
        lastName,
        email,
        phoneNumber,
        JSON.stringify(items),
        totalPrice,
        deliveryMethod,
      ],
    };
    const data = await client.query(query);
    res.send().status(200);
  } catch (err) {
    res.status(err.status).send({
      message: err.message,
    });
    console.log(err);
  } finally {
    client.release();
  }
}
