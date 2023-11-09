import pool from '..index';

pool.on('error', (err, client) => {
  console.error(err);
  process.exit(-1);
});

export async function getNewReleases(req, res) {
  // const client = await pool.connect();
}
