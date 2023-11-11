import cors from "cors";
import pkg from "pg";
import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/albumRoutes.js";
import { getCategories } from "./src/controllers/categoriesController.js";
import { searchAlbums } from "./src/controllers/albumController.js";

dotenv.config();

const { Pool } = pkg;
const port = 3001;
const app = express();

const connectionString = process.env.PGHOST;

export const pool = new Pool({
  connectionString: connectionString,
  max: 50,
});

pool.on("error", (err) => {
  console.error(err);
  process.exit(-1);
});

app.use(express.json());

app.use(cors());

app.use("/albums", router);

app.post("/search", async (req, res) => {
  const searchTerm = req?.body?.searchTerm;
  const response = await searchAlbums(searchTerm);
  res.send(response);
});

app.get("/genres", async (req, res) => {
  const response = await getCategories(req);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Funktiot päivämäärien manipuloimiseksi tietokannassa, että pystyy testaamaan uusimpien albumien filtteröintiä.

async function postCurrentDate() {
  const client = await pool.connect();
  console.log("connecting client");
  try {
    const text = "UPDATE albums SET releaseDate = ($1) WHERE albumId < 5";
    const date = new Date();
    console.log(date);
    const values = [date];
    const response = await client.query(text, values);
  } catch (err) {
    console.log("failed", err);
  } finally {
    client.release();
    console.log("release client");
  }
}

async function postPrevDate() {
  const client = await pool.connect();
  console.log("connecting client");
  try {
    const text = "UPDATE albums SET releaseDate = ($1) WHERE albumId >= 5";
    const currentDate = new Date();
    const prevDate = new Date(currentDate - 10 * (24 * 60 * 60 * 1000));
    const values = [prevDate];
    const response = await client.query(text, values);
  } catch (err) {
    console.log("failed", err);
  } finally {
    client.release();
    console.log("release client");
  }
}

app.post("/currentdate", postCurrentDate);
app.post("/prevdate", postPrevDate);

// TESTIFUNKTION LOPPUU
