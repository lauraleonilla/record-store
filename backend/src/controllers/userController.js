import { pool } from '../../api/index.js';
import bcrypt, { hash } from 'bcrypt';

async function connectClientToPool() {
  try {
    return await pool.connect();
  } catch (err) {
    console.log('Error connecting to database: ', err);
    return;
  }
}

function filterEmptyValues(object) {
  const newObject = {};
  for (const key in object) {
    if (object[key] !== '' && key !== 'confirmPassword') {
      newObject[key] = object[key];
    }
  }
  return newObject;
}

async function createQueryParams(userDetails) {
  const columns = Object.keys(userDetails);
  const queryPlaceholders = columns.map((_, index) => `$${index + 1}`);

  const queryText = `INSERT INTO users (${columns.join(', ')}) VALUES (${queryPlaceholders.join(
    ', '
  )}) RETURNING *`;
  return queryText;
}

export async function registerUser(req, res) {
  const userDetails = req.body;
  const filteredObject = filterEmptyValues(userDetails);
  const hashedPw = await bcrypt.hash(filteredObject.password, 10);
  filteredObject.password = hashedPw;
  const values = Object.values(filteredObject);
  const text = await createQueryParams(filteredObject);
  let client = null;
  client = await connectClientToPool();
  // console.log(values);
  // console.log(text);

  try {
    const createdUser = await client.query(text, values);
    res.send(JSON.stringify(createdUser.rows)).status(200);
    console.log(createdUser.rows);
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
