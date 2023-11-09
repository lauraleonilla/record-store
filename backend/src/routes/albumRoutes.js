const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');

router.get('/newReleases', albumController.getNewReleases);

module.export = router;
