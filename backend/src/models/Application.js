const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  role: { type: String, required: true },
  appliedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Applied', 'Interview', 'Selected', 'Rejected'], default: 'Applied' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
