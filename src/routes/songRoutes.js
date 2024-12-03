const express = require('express');
const songController = require('../controllers/songController');
const router = express.Router();

router.get('/songs', songController.getAllSongs); 
router.post('/songs', songController.addSong);
router.delete('/songs/:id', songController.deleteSong);
// API tìm kiếm bài hát
router.get('/songs/search', songController.searchSongs);

module.exports = router;
