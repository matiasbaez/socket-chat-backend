const { io } = require('../index');

const jwt = require('../helpers/jwt');
const socketController = require('../controllers/socket');

// Sockets Messages
io.on('connection', (client) => {
    console.log('Client connected');

    const token = client.handshake.auth['x-token'];
    const { success, uid } = jwt.checkJWT(token);

    if (!success) return client.disconnect();

    socketController.userConnected(uid);

    // Join connected client to private room
    client.join( uid );

    client.on('private-message', async (payload) => {
        const saved = await socketController.saveMessage(payload);
        if (saved) io.to( payload.to ).emit('private-message', payload);
    });

    client.on('disconnect', () => {
        socketController.userDisconnected(uid);
        console.log('Client desconnected');
    });

});
