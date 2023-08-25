const express = require('express');
const router = express.Router();

const { sessionUser } = require('../middleware/session.js');

const { sendReport } = require('../Controller/reportposting.controller.js');
router.post('/report/:postId/posting', sessionUser, sendReport);

module.exports = router;