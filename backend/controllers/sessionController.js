const Session = require('../models/session');

exports.getAllSessions = async (req, res) => {
    try {
      const sessions = await Session.find();
      res.json(sessions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getSessionById = async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);
      res.json(session);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.createSession = async (req, res) => {
    const session = new Session({
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      client: req.body.client
    });
  
    try {
      const newSession = await session.save();
      res.status(201).json(newSession);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  exports.updateSession = async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);
      if (session == null) {
        return res.status(404).json({ message: 'Session not found' });
      }
  
      session.date = req.body.date;
      session.startTime = req.body.startTime;
      session.endTime = req.body.endTime;
      session.client = req.body.client;
  
      const updatedSession = await session.save();
      res.json(updatedSession);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  exports.deleteSession = async (req, res) => {
    try {
      await Session.findByIdAndDelete(req.params.id);
      res.json({ message: 'Session deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

