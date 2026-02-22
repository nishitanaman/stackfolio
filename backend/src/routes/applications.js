const express = require('express');
const {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication
} = require('../controllers/applicationController');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(auth);

router.post('/', createApplication);
router.get('/', getApplications);
router.get('/:id', getApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
