require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const websocketService = require('./services/websocketService');
const corsOptions = require('./config/corsOptions');
const validateApiToken = require('./midleware/apiTokenMiddleware');
const validateWebhook = require('./midleware/webhookValidation');

const app = express();

app.use(bodyParser.json());

app.use('/webhook', validateWebhook, require('./routes/webhookRoutes'));
app.use('/payments', cors(corsOptions), validateApiToken, require('./routes/paymentRoutes'));

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.sync();
    console.log('database and models synchronized!');

    app.listen(PORT, () => {
      console.log(`HTTP server running on ${PORT}`);
    });

    websocketService.initialize();
  } catch (error) {
    console.error('Starting server error:', error);
  }
}

startServer();
