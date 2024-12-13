const websocketService = require('../services/websocketService');
const Payment = require('../models/Payment');
const { logError } = require('../utils/errorLogger');
const axios = require('axios');


function updatePaymentStatus(externalReference, externalId, status, payerId, canceled, isTest, orderStatus, clientId) {

  const payment = Payment.findOneAndUpdate(
    { externalReference },
    {
      status: canceled ? 'cancelled' : status,
      externalId,
      payerId,
      isTest,
      orderStatus,
      clientId
    },
  );
  return payment
}

function shouldSendWebsocketNotification(status) {
  if (status == 'paid') {
    return true
  }
  return false
}

exports.handleWebhook = async (req, res) => {
  try {
    console.log('webhook received:', req.body);

    const { resource, topic } = req.body;
    const urlRegex = /^(https):\/\/[^\s/$.?#].[^\s]*$/i;

    if (urlRegex.test(resource) && topic == "merchant_order") {
      console.log('Resource is a valid URL:', resource);
      const response = await axios.get(resource, {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        }
      });
      const data = response.data
      const payment = updatePaymentStatus(data.external_reference, data.id, data.status, data.payer, data.cancelled, data.is_test, data.order_status, data.client_id)
      if (shouldSendWebsocketNotification(payment.orderStatus)) {
        websocketService.broadcastMessage(payment)
      }
    }
    res.status(200).json({ message: 'Evento processado com sucesso'});
  } catch (error) {
    logError('webhook controller error :', error);
    res.status(500).json({ message: 'webhook processing error' });
  }
};