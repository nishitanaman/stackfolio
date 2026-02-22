const Project = require('../models/Project');
const Achievement = require('../models/Achievement');
const Application = require('../models/Application');

exports.getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const [projectCount, achCount, appCount] = await Promise.all([
      Project.countDocuments({ owner: userId }),
      Achievement.countDocuments({ owner: userId }),
      Application.countDocuments({ owner: userId })
    ]);
    res.json({ projectCount, achCount, appCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
