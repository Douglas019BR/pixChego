const crypto = require('crypto');

const validateWebhook = (req, res, next) => {
  console.log(req.headers)
  try {
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    if (!xSignature || !xRequestId) {
      console.log('xSignature or xRequestId not found')
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
      console.log('Invalid webhook signature')
      // return res.status(403).json({ 
      //   error: 'Invalid webhook signature'
      // });
    }

    next();
  } catch (error) {
    logError('webhook validation error:', error);
    res.status(500);
  }
};

module.exports = validateWebhook;