require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const websocketService = require('./services/websocketService');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/webhook', require('./routes/webhookRoutes'));
app.use('/payments', require('./routes/paymentRoutes'));

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.sync();
    console.log('Modelos sincronizados com o banco de dados');

    app.listen(PORT, () => {
      console.log(`Servidor HTTP rodando na porta ${PORT}`);
    });

    websocketService.initialize();
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();