const express = require('express');
const router = express.Router();
const StatusCheck = require('../models/StatusCheck');

const memoryStatusChecks = [];

// @route   GET /api/status
// @desc    Get status checks
// @access  Public
router.get('/status', async (req, res) => {
  try {
    let checks = [];
    try {
      checks = await StatusCheck.find({}, { _id: 0, __v: 0 }).limit(1000);
    } catch (e) {
      checks = memoryStatusChecks;
    }
    return res.status(200).json(checks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// @route   POST /api/status
// @desc    Create a status check
// @access  Public
router.post('/status', async (req, res) => {
  try {
    const { client_name } = req.body;
    const doc = {
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      client_name: client_name || 'Anonymous Client',
      timestamp: new Date().toISOString(),
    };

    try {
      await StatusCheck.create(doc);
    } catch (e) {
      memoryStatusChecks.push(doc);
    }

    return res.status(201).json(doc);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// @route   GET /api
// @desc    Root API endpoint
// @access  Public
router.get('/', (req, res) => {
  return res.json({
    name: "AUREXA Luxury API",
    status: "online",
    stack: "MERN (MongoDB, Express.js, React, Node.js)",
    timestamp: new Date().toISOString(),
    endpoints: {
      invitations_request: "POST /api/invitations/request",
      invitations_verify: "POST /api/invitations/verify",
      invitations_list: "GET /api/invitations",
      lots_list: "GET /api/lots",
      lots_inquire: "POST /api/lots/:id/inquire",
      status_check: "GET /api/status"
    }
  });
});

module.exports = router;
