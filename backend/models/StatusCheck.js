const mongoose = require('mongoose');

const statusCheckSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    client_name: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('StatusCheck', statusCheckSchema);
