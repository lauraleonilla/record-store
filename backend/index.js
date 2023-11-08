import express from "express";
import { searchAlbums, getGenres } from "./queries.js";
import cors from "cors";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const port = 3001;
const app = express();

const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString: connectionString,
});

pool.connect((err, client, done) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Connected to the database");
  }
});

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/search", async (req, res) => {
  const searchTerm = req?.body?.searchTerm;
  const response = await searchAlbums(pool, searchTerm);
  res.send(response);
});

app.get("/genres", async (req, res) => {
  const response = await getGenres(pool);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
