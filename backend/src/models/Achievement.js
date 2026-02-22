const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  category: { type: String, enum: ['hackathon', 'certificate', 'competition'], required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  fileUrl: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Achievement', achievementSchema);
