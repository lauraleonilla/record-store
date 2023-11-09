import express from 'express';
import {
  getAllAlbums,
  getNewReleases,
} from '../controllers/albumController.js';

const router = express.Router();

router.get('/newreleases', getNewReleases);

router.get('/all', getAllAlbums);

export default router;
