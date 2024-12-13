const express = require('express');
const webhookController = require('../controllers/webhookController');
require('dotenv').config();

const webhookRouter = express.Router();

webhookRouter.post('/', webhookController.handleWebhook);

module.exports = webhookRouter;