const http = require('http');
const WebSocket = require('ws');

// Create a standard HTTP server to satisfy Render's health checks
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('P2P Signaling Server is Live!\n');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New Peer Connected');

    ws.on('message', (data) => {
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

const port = process.env.PORT || 8080;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
