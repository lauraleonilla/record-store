import { pool } from '../../index.js';
import bcrypt from 'bcrypt';

export async function validateEmail(req, res) {
  let client = null;
  const email = req.body.email;
  try {
    client = await pool.connect();
  } catch (err) {
    console.log('Error connecting to database: ', err);
    return;
  }
  try {
    const emailData = await client.query('SELECT email FROM users WHERE email = $1', [email]);
    res.send(JSON.stringify(emailData.rows)).status(200);
  } catch (err) {
    console.error('Error while validating email:', err);
  } finally {
    client.release();
  }
}

export async function registerUser(req, res) {
  const { email, firstName, lastName, address, postalCode, city, phoneNumber, password } = req.body;
  let client = null;
  try {
    client = await pool.connect();
  } catch (err) {
    console.log('Error connecting to database: ', err);
    return;
  }
  const hashedPw = await bcrypt.hash(password, 10);
  const query = {
    text: 'INSERT INTO users (email, firstName, lastName, street, postalCode, city, phoneNum, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    values: [email, firstName, lastName, address, postalCode, city, phoneNumber, hashedPw],
  };
  try {
    const createdUser = await client.query(query);
    res.send(JSON.stringify(createdUser.rows)).status(200);
  } catch (err) {
    console.error('Error when registering new user to db: ', err);
  } finally {
    client.release();
  }
}
