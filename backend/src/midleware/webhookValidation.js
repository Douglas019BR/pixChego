const crypto = require('crypto');

const validateWebhook = (req, res, next) => {
  try {
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    if (!xSignature || !xRequestId) {
      return res.status(400).json({ 
        error: 'Invalid headers' 
      });
    }

    const [tsPart, signaturePart] = xSignature.split(',');
    const ts = tsPart.split('=')[1];
    const receivedSignature = signaturePart.split('=')[1];

    const dataId = req.body.data?.id || '';
    const validationTemplate = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

    const calculatedSignature = crypto
      .createHmac('sha256', process.env.SECRET_SIGNATURE)
      .update(validationTemplate)
      .digest('hex');

    if (calculatedSignature !== receivedSignature) {
      return res.status(403).json({ 
        error: 'Invalid webhook signature'
      });
    }

    next();
  } catch (error) {
    console.error('webhook validation error:', error);
    res.status(500);
  }
};

module.exports = validateWebhook;