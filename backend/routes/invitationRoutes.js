const express = require('express');
const router = express.Router();
const InvitationRequest = require('../models/InvitationRequest');
const InvitationCode = require('../models/InvitationCode');

// In-memory store fallback if MongoDB is not running locally
const memoryRequests = [];
const VALID_DEMO_CODES = ['AUREXA', 'AUREXA2026', 'VIP-PALAZZO', 'CONNOISSEUR', 'AUREXA-II-0000'];

// @route   POST /api/invitations/request
// @desc    Submit a new private invitation request
// @access  Public
router.post('/request', async (req, res) => {
  try {
    const { name, email, phone, city, interest, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required to request an invitation.',
      });
    }

    let savedRequest = null;

    try {
      // Attempt to save in MongoDB
      savedRequest = await InvitationRequest.create({
        name,
        email,
        phone,
        city,
        interest,
        message,
      });
    } catch (dbErr) {
      // Fallback to in-memory store if DB is offline
      savedRequest = {
        _id: Date.now().toString(),
        name,
        email,
        phone,
        city,
        interest,
        message,
        status: 'pending',
        createdAt: new Date(),
      };
      memoryRequests.push(savedRequest);
    }

    return res.status(201).json({
      success: true,
      message: 'Invitation request received by the house. We will respond within seven days.',
      data: savedRequest,
    });
  } catch (error) {
    console.error('Error submitting invitation request:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing invitation request.',
      error: error.message,
    });
  }
});

// @route   POST /api/invitations/verify
// @desc    Verify an invitation code for private gallery access
// @access  Public
router.post('/verify', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        success: false,
        valid: false,
        message: 'Please provide an invitation code.',
      });
    }

    const cleanCode = code.trim().toUpperCase();

    // Check DB first if available
    let match = null;
    try {
      match = await InvitationCode.findOne({ code: cleanCode });
    } catch (e) {
      match = null;
    }

    // Demo/VIP fallback matching
    const isDemoValid =
      cleanCode.startsWith('AUREXA') ||
      VALID_DEMO_CODES.includes(cleanCode) ||
      cleanCode.length >= 4;

    if (match || isDemoValid) {
      return res.status(200).json({
        success: true,
        valid: true,
        tier: match ? match.tier : 'Patron',
        holder: match ? match.holderName : 'Distinguished Guest',
        message: 'Welcome to the private rooms of AUREXA II.',
      });
    }

    return res.status(401).json({
      success: false,
      valid: false,
      message: 'Invalid or expired invitation code. Please contact the house concierge.',
    });
  } catch (error) {
    console.error('Error verifying invitation code:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during invitation verification.',
    });
  }
});

// @route   GET /api/invitations
// @desc    Get all invitation requests (for admin/concierge)
// @access  Public (in demo mode)
router.get('/', async (req, res) => {
  try {
    let requests = [];
    try {
      requests = await InvitationRequest.find().sort({ createdAt: -1 });
    } catch (e) {
      requests = memoryRequests;
    }

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
