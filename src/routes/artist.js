const express = require('express');
const artistController = require('../controllers/artist');
const albumController = require('../controllers/album');

const router = express.Router();

// GET
router.get('/', artistController.artist_read);
router.get('/:artistId', artistController.artist_read_id);

// POST
router.post('/', artistController.artist_create);
router.post('/:artistId/album', albumController.album_create);

// PATCH
router.patch('/:artistId', artistController.artist_update);

// DELETE
router.delete('/:artistId', artistController.artist_delete);

module.exports = router;
