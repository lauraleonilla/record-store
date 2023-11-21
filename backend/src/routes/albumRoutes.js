import express from 'express';
import {
  getAllAlbums,
  getNewReleases,
  searchAlbums,
  getAlbumsByGenre
} from '../controllers/albumController.js';

const router = express.Router();

router.get('/newreleases', getNewReleases);

router.post('/all', getAllAlbums);

router.post('/search', searchAlbums);

router.get('/:genre', getAlbumsByGenre);

export default router;
