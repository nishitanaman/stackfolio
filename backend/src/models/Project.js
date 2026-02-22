const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  techStack: [{ type: String }],
  description: { type: String },
  githubLink: { type: String },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
