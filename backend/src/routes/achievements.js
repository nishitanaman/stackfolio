const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createAchievement,
  getAchievements,
  getAchievement,
  updateAchievement,
  deleteAchievement
} = require('../controllers/achievementController');
const auth = require('../middleware/auth');

// configure multer storage to uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const router = express.Router();
router.use(auth);

router.post('/', upload.single('file'), createAchievement);
router.get('/', getAchievements);
router.get('/:id', getAchievement);
router.put('/:id', upload.single('file'), updateAchievement);
router.delete('/:id', deleteAchievement);

module.exports = router;
