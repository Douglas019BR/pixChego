const WebSocket = require('ws');
require('dotenv').config();

class WebSocketService {
  constructor() {
    this.clients = new Set();
    this.wss = null;
  }

  initialize(port = process.env.WEBSOCKET_PORT) {
    this.wss = new WebSocket.Server({ port });

    this.wss.on('connection', (ws) => {
      console.log('Cliente conectado ao WebSocket');
      this.clients.add(ws);

      ws.on('close', () => {
        console.log('Cliente desconectado do WebSocket');
        this.clients.delete(ws);
      });
    });
  }

  broadcastMessage(message) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

module.exports = new WebSocketService();