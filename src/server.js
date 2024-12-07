const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

// Lista de conexões WebSocket ativas
const clients = new Set();

wss.on('connection', (ws) => {
    console.log('Cliente conectado ao WebSocket');
    clients.add(ws);

    // Remove o cliente da lista ao desconectar
    ws.on('close', () => {
        console.log('Cliente desconectado do WebSocket');
        clients.delete(ws);
    });
});

// Endpoint para receber eventos do webhook
app.post('/webhook', (req, res) => {
    console.log('Evento recebido:', req.body);

    // Envia o evento para todos os clientes conectados
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });

    res.status(200).json({ message: 'Evento recebido com sucesso' });
});

// Inicializa o servidor
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
