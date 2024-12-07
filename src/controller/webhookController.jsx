import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import WebhookService from './services/webhookService';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/receive-webhook', (req, res) => {
  try {
    const webhookEvent = req.body;
    WebhookService.addEvent(webhookEvent);
    
    res.status(200).json({
      message: 'Evento recebido com sucesso'
    });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ 
      message: 'Erro ao processar evento', 
      error: error.message 
    });
  }
});

export default app;