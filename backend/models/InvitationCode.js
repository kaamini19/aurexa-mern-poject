const mongoose = require('mongoose');

const invitationCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    holderName: {
      type: String,
      default: 'Distinguished Guest',
    },
    tier: {
      type: String,
      enum: ['Patron', 'Connoisseur', 'VIP', 'General'],
      default: 'Patron',
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    expiresAt: {
      type: Date,
      default: () => new Date('2026-10-31'),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('InvitationCode', invitationCodeSchema);
