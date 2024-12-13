require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const websocketService = require('./services/websocketService');
const corsOptions = require('./config/corsOptions');
const validateApiToken = require('./middleware/apiTokenMiddleware');
const validateWebhook = require('./middleware/webhookValidation');

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(['/payments'], validateApiToken);
app.use(['/webhook'], validateWebhook);


app.use('/webhook', require('./routes/webhookRoutes'));
app.use('/payments', require('./routes/paymentRoutes'));

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
    logError('Starting server error:', error);
  }
}

startServer();