const express = require('express');
const router = express.Router();
const multer = require('multer');
const challengeController = require('../controllers/challengeController');
const upload = challengeController.upload;


router.post('/challenges', upload.single('photo'), challengeController.createChallenge);

router.get('/challenges', challengeController.getAllChallenges);

router.get('/challenges/:id', challengeController.getChallengeById);

router.put('/challenges/:id', challengeController.updateChallenge);

router.delete('/challenges/:id', challengeController.deleteChallenge);

module.exports = router;
