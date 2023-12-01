import cors from 'cors';
import pkg from 'pg';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import router from '../src/routes/albumRoutes.js';
import mainRouter from '../src/routes/mainRoutes.js';
import userRouter from '../src/routes/userRoutes.js';
import { authenticateToken } from '../src/controllers/userController.js';

dotenv.config();

const { Pool } = pkg;
const port = 3001;
const app = express();

const connectionString = process.env.PGHOST;

export const pool = new Pool({
  connectionString: connectionString,
  max: 50,
});

pool.on('error', (err) => {
  console.error(err);
  process.exit(-1);
});

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  // origin: 'https://recort-store-fe.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options('*', cors(corsOptions));

// app.use(cors(corsOptions));

app.use('/main', mainRouter);

app.use('/albums', router);

app.use('/users', userRouter);

app.post('/generatetoken', (req, res) => {
  const refreshToken = req.cookies['refreshToken'];

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.json('invalid token');
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    console.log(accessToken);
    res.json({ accessToken: accessToken });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Funktiot päivämäärien manipuloimiseksi tietokannassa, että pystyy testaamaan uusimpien albumien filtteröintiä.

async function postCurrentDate() {
  const client = await pool.connect();
  console.log('connecting client');
  try {
    const text = 'UPDATE albums SET releaseDate = ($1) WHERE albumId < 5';
    const date = new Date();
    console.log(date);
    const values = [date];
    const response = await client.query(text, values);
  } catch (err) {
    console.log('failed', err);
  } finally {
    client.release();
    console.log('release client');
  }
}

async function postPrevDate() {
  const client = await pool.connect();
  console.log('connecting client');
  try {
    const text = 'UPDATE albums SET releaseDate = ($1) WHERE albumId >= 5';
    const currentDate = new Date();
    const prevDate = new Date(currentDate - 10 * (24 * 60 * 60 * 1000));
    const values = [prevDate];
    const response = await client.query(text, values);
  } catch (err) {
    console.log('failed', err);
  } finally {
    client.release();
    console.log('release client');
  }
}

app.post('/currentdate', postCurrentDate);
app.post('/prevdate', postPrevDate);

export default app;
