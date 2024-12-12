const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.post('/payments', paymentController.createPayment);
router.get('/payments', paymentController.listPayments);

module.exports = router;