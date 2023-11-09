const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const pg = require('pg');

require('dotenv').config();

const albumRoutes = require('./routes/albumRoutes');

app.use(cors());
app.use(express.json());

// Crete connection to db by calling pool.connect()
const connectionString = process.env.PGHOST;
export const pool = new pg.Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 10000,
});

app.get('/api/albums', albumRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
