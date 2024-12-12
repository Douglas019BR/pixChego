const Payment = require('../models/Payment');
const { logError } = require('../utils/errorLogger');

const URL_QR_STATIC_ORDER = 'https://api.mercadopago.com/instore/orders/qr/seller/collectors/' + process.env.USER_ID + '/pos/' + process.env.EXTERNAL_POS_ID + '/qrs'
exports.createPayment = async (req, res) => {
    try {
        const { amount, externalId } = req.body;

        // TO DO
        // bater na rota de criar pagamento e pegar o externalId no response


        // Create order to static QR : PUT
        // https://api.mercadopago.com/instore/orders/qr/seller/collectors/:userId/pos/:externalPosId/qrs

        // {
        //     "external_reference": "reference_23",
        //     "notification_url":"https://webhook.site/a281033b-f7da-44c3-9920-810137609f30",
        //     "total_amount": 1,
        //     "items": [
        //         {
        //             "sku_number": "70002",
        //             "category": "electronics",
        //             "title": "Auriculares",
        //             "description": "phone",
        //             "quantity": 1,
        //             "unit_measure": "unit",
        //             "unit_price": 1,
        //             "total_amount": 1
        //         }
        //     ],
        //     "title": "teste douglas",
        //     "description": "douglas teste" 
        // }

        const payment = await Payment.create({
            amount,
            externalId,
            title,
            description,
            orderStatus: 'pending',
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