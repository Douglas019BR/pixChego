const express = require('express');
const webhookController = require('../controllers/webhookController');
require('dotenv').config();

const router = express.Router();

router.post('/webhook/' + process.env.WEBHOOK_TOKEN, webhookController.handleWebhook);

module.exports = router;