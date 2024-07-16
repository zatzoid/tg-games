const { connectToRoom, getRooms, createRoom } = require('../controllers/rooms');


const router = require('express').Router();

router.post('/create-room', createRoom);
router.get('/connect-room', connectToRoom);
router.get('/get-rooms', getRooms)


module.exports = router