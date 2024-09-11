import WebSocket, { WebSocketServer } from 'ws';

// Création du serveur WebSocket sur le port 8081
const wss = new WebSocketServer({ port: 8081 });

// Serveur WebSocket gérant différentes connexions
wss.on('connection', (ws, req) => {
    const pathname = new URL(req.url, `ws://${req.headers.host}`).pathname;
  
    if (pathname === '/users') {
        console.log('User WebSocket connection established');
        ws.on('message', (message) => {
            console.log(`Received user message => ${message}`);
        });
        ws.send(JSON.stringify({ type: 'info', message: 'Welcome to the User WebSocket!' }));
    } else if (pathname === '/transactions') {
        console.log('Transaction WebSocket connection established');
        ws.on('message', (message) => {
            console.log(`Received transaction message => ${message}`);
        });
        ws.send(JSON.stringify({ type: 'info', message: 'Welcome to the Transaction WebSocket!' }));
    } else {
        console.log(`Unrecognized path: ${pathname}`);
        ws.close();
    }
});

console.log('WebSocket server is running on ws://localhost:8081');
