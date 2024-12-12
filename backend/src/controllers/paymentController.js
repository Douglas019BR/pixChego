const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  try {
    const { amount, externalId } = req.body;
    
    // TO DO
    // bater na rota de criar pagamento e pegar o externalId no response


    const payment = await Payment.create({
      amount,
      externalId,
      title,
      description,
      orderStatus : 'pending',
    });

    res.status(201).json(payment);
  } catch (error) {
    console.error('Erro ao criar pagamento:', error);
    res.status(500);
  }
};

exports.listPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      order: [['paidAt', 'DESC']]
    });
    res.json(payments);
  } catch (error) {
    console.error('Error listing payments:', error);
    res.status(500);
  }
};