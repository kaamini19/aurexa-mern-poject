const mongoose = require('mongoose');

const lotInquirySchema = new mongoose.Schema(
  {
    lotNumber: {
      type: String,
      required: true,
      trim: true,
    },
    lotTitle: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientEmail: {
      type: String,
      required: true,
      trim: true,
    },
    clientPhone: {
      type: String,
      default: '',
    },
    inquiryType: {
      type: String,
      enum: ['condition_report', 'private_viewing', 'absentee_bid', 'general'],
      default: 'condition_report',
    },
    bidAmount: {
      type: Number,
      default: null,
    },
    message: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LotInquiry', lotInquirySchema);
