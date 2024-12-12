const websocketService = require('../services/websocketService');
const Payment = require('../models/Payment');
const { urlencoded } = require('body-parser');

exports.handleWebhook = async (req, res) => {
  try {
    console.log('Evento recebido:', req.body);

    // if req.body contains url : 
    //     get url
    //     update Payment
    // elif paymenyId :
    //      const payment = await Payment.findOne
    //     websocketService.broadcastMessage(payment.serializer);

    res.status(200).json({ message: 'Evento recebido com sucesso', paymentId: payment.id });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ message: 'Erro ao processar webhook' });
  }
};