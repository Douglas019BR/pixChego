const Payment = require('../models/Payment');
const { logError } = require('../utils/errorLogger');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const URL_QR_STATIC_ORDER = 'https://api.mercadopago.com/instore/orders/qr/seller/collectors/' + process.env.USER_ID + '/pos/' + process.env.EXTERNAL_POS_ID + '/qrs'


exports.createPayment = async (req, res) => {
    try {
        const { amount, title, description } = req.body;
        const externalReference = uuidv4();
        const normalizedAmount = amount.replace(",", ".");
        const doubleAmount = parseFloat(normalizedAmount);
        const bodyData = {
            external_reference: externalReference.toString(),
            notification_url: process.env.NOTIFICATION_URL,
            total_amount: doubleAmount,
            items: [
                {
                    sku_number: '70002',
                    category: 'electronics',
                    title: "product",
                    description: "generic payment order",
                    quantity: 1,
                    unit_measure: 'unit',
                    unit_price: doubleAmount,
                    total_amount: doubleAmount,
                }
            ],
            title: title,
            description: description
        };

        let retryCount = 0;
        const maxRetries = 5;
        let response;

        while (retryCount < maxRetries) {
            try {
            response = await axios.post(URL_QR_STATIC_ORDER, bodyData, {
                headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
                }
            });
            break;
            } catch (error) {
            retryCount++;
            if (retryCount === maxRetries) {
                throw new Error('Failed to create payment after multiple attempts');
            }
            }
        }

        const payment = await Payment.create({
            amount,
            externalReference,
            title,
            description,
        });
        console.log(response.data)
        res.status(201).json(response.data);
    } catch (error) {
        logError('Erro ao criar pagamento:', error);
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
        logError('Error listing payments:', error);
        res.status(500);
    }
};