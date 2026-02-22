const Achievement = require('../models/Achievement');

exports.createAchievement = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.fileUrl = `/uploads/${req.file.filename}`;
    }
    const ach = new Achievement({ ...data, owner: req.user.id });
    await ach.save();
    res.status(201).json(ach);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAchievements = async (req, res) => {
  try {
    const items = await Achievement.find({ owner: req.user.id });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAchievement = async (req, res) => {
  try {
    const item = await Achievement.findOne({ _id: req.params.id, owner: req.user.id });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.fileUrl = `/uploads/${req.file.filename}`;
    }
    const updated = await Achievement.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      data,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found or not authorized' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const deleted = await Achievement.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!deleted) return res.status(404).json({ message: 'Not found or not authorized' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
