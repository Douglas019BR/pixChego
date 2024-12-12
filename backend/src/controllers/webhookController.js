const websocketService = require('../services/websocketService');
const Payment = require('../models/Payment');
const { logError } = require('../utils/errorLogger');

exports.handleWebhook = async (req, res) => {
  try {
    console.log('Evento recebido:', req.body);
    // TO DO 
    // if req.body contains url : 
    //     get url
    //     update Payment
    // elif paymenyId :
    //      const payment = await Payment.findOne
    //     websocketService.broadcastMessage(payment.serializer);

    res.status(200).json({ message: 'Evento recebido com sucesso', paymentId: payment.id });
  } catch (error) {
    logError('webhook controller error :', error);
    res.status(500).json({ message: 'webhook processing error' });
  }
};