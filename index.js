const WebSocket = require('ws');

// Render provides the port via process.env.PORT
const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
    console.log('New Peer Connected');

    ws.on('message', (data) => {
        // Convert buffer to string
        const message = data.toString();
        console.log('Received:', message);

        // Broadcast to all other connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => console.log('Peer Disconnected'));
    
    ws.on('error', (error) => console.error('WebSocket Error:', error));
});

console.log(`Signaling server is running on port ${port}`);
