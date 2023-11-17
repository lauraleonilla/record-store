import express from 'express';
import {
  getAllAlbums,
  getNewReleases,
  searchAlbums,
} from '../controllers/albumController.js';

const router = express.Router();

router.get('/newreleases', getNewReleases);

router.post('/all', getAllAlbums);

router.post('/search', searchAlbums);

export default router;
