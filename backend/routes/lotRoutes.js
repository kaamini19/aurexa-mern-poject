const express = require('express');
const router = express.Router();
const LotInquiry = require('../models/LotInquiry');

const LOTS = [
  {
    no: "01",
    title: "Portrait of a Young Florentine",
    origin: "Florence",
    period: "c. 1515",
    medium: "Oil on walnut panel",
    estimate: "€ 4.8M – 6.2M",
    img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
    provenance: "Private Collection, Milan; by descent through the counts of Melzo.",
    condition: "Exceptional preservation. Original Italian Renaissance frame.",
  },
  {
    no: "02",
    title: "Torso of an Athlete",
    origin: "Rome",
    period: "I Century AD",
    medium: "Parian marble on Belgian granite",
    estimate: "€ 3.2M – 4.0M",
    img: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
    provenance: "Acquired Rome, 1888; collection of Lord Curzon of Kedleston.",
    condition: "Fine crystal grain marble with historical museum patina.",
  },
  {
    no: "03",
    title: "Still Life with Quinces and Jasper",
    origin: "Madrid",
    period: "1642",
    medium: "Oil on linen canvas",
    estimate: "€ 2.6M – 3.4M",
    img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop",
    provenance: "Palacio de Liria, Madrid; French private collection since 1923.",
    condition: "Luminous chiaroscuro, unlined canvas.",
  },
  {
    no: "04",
    title: "Empire Centrepiece in Ormolu",
    origin: "Paris",
    period: "c. 1810",
    medium: "Mercury-gilded & patinated bronze",
    estimate: "€ 850k – 1.1M",
    img: "https://images.pexels.com/photos/35226355/pexels-photo-35226355.jpeg?auto=compress&cs=tinysrgb&w=1600",
    provenance: "Commission for Château de Saint-Cloud, workshop of Thomire.",
    condition: "Original fire-gilt gold leaf in museum grade condition.",
  },
  {
    no: "05",
    title: "View of the Grand Canal at Dusk",
    origin: "Venice",
    period: "c. 1765",
    medium: "Oil on fine canvas",
    estimate: "€ 5.5M – 7.0M",
    img: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1200&auto=format&fit=crop",
    provenance: "Collection of the 3rd Duke of Buccleuch; Private Trust, Zurich.",
    condition: "Stable, unvarnished original texture with vivid pigments.",
  }
];

// In-memory inquiries fallback
const memoryInquiries = [];

// @route   GET /api/lots
// @desc    Get all auction lots
// @access  Public
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    count: LOTS.length,
    data: LOTS,
  });
});

// @route   POST /api/lots/:id/inquire
// @desc    Submit inquiry or absentee bid for a specific lot
// @access  Public
router.post('/:id/inquire', async (req, res) => {
  try {
    const lotId = req.params.id;
    const lot = LOTS.find((l) => l.no === lotId);

    const { clientName, clientEmail, clientPhone, inquiryType, bidAmount, message } = req.body;

    if (!clientName || !clientEmail) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required to submit an inquiry.',
      });
    }

    let saved = null;
    try {
      saved = await LotInquiry.create({
        lotNumber: lotId,
        lotTitle: lot ? lot.title : `Lot #${lotId}`,
        clientName,
        clientEmail,
        clientPhone,
        inquiryType: inquiryType || 'condition_report',
        bidAmount: bidAmount || null,
        message: message || '',
      });
    } catch (e) {
      saved = {
        _id: Date.now().toString(),
        lotNumber: lotId,
        lotTitle: lot ? lot.title : `Lot #${lotId}`,
        clientName,
        clientEmail,
        clientPhone,
        inquiryType: inquiryType || 'condition_report',
        bidAmount: bidAmount || null,
        message: message || '',
        createdAt: new Date(),
      };
      memoryInquiries.push(saved);
    }

    return res.status(201).json({
      success: true,
      message: 'Private inquiry lodged with the rostrum specialists.',
      data: saved,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
