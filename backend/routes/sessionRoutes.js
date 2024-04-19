const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

router.get('/training-session', sessionController.getAllSessions);
router.get('/training-session/:id', sessionController.getSessionById);
router.post('/training-session/book', sessionController.createSession);
router.put('/training-session/:id', sessionController.updateSession);
router.delete('/training-session/:id', sessionController.deleteSession);

module.exports = router;
