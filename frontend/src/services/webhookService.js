const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    try {
      const webhookEvent = req.body;
  
      console.log('Evento recebido:', webhookEvent);
      res.status(200).json({ message: 'Evento recebido com sucesso' });
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      res.status(500).json({ 
        message: 'Erro ao processar evento', 
        error: error.message 
      });
    }
  });