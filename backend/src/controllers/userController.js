import { pool } from '../../api/index.js';
import bcrypt from 'bcrypt';

async function connectClientToPool() {
  try {
    return await pool.connect();
  } catch (err) {
    console.log('Error connecting to database: ', err);
    return;
  }
}

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

export async function loginUser(req, res) {
  const { email, password } = req.body;
  let client = null;
  try {
    client = await connectClientToPool();
    const emailData = await client.query('SELECT email FROM users WHERE email = $1', [email]);
    if (!emailData.rows.length) {
      res.send(JSON.stringify('incorrect email')).status(200);
      return;
    }
    const pwData = await client.query('SELECT password FROM users WHERE email = $1', [email]);
    const hashedPw = pwData.rows[0].password;
    const pwComparison = await bcrypt.compare(password, hashedPw);
    if (!pwComparison) {
      res.send(JSON.stringify('incorrect password')).status(200);
      return;
    }
    res.send(JSON.stringify(email)).status(200);
  } catch (err) {
    console.error('Error logging in user:', err);
  } finally {
    client.release();
  }
}
