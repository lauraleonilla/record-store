import express from "express";
import {
  getAllAlbums,
  getNewReleases,
  searchAlbums,
} from "../controllers/albumController.js";
import { getCategories } from "../controllers/categoriesController.js";

const router = express.Router();

router.get("/newreleases", getNewReleases);

router.get("/all", getAllAlbums);

router.get("/search", searchAlbums);

router.get("/genres", getCategories);

export default router;
