const { io } = require('../index');

const jwt = require('../helpers/jwt');
const socketController = require('../controllers/socket');

// Sockets Messages
io.on('connection', (client) => {
    console.log('Client connected');

    const token = client.handshake.headers['x-token'];
    const { success, uid } = jwt.checkJWT(token);

    if (!success) return client.disconnect();

    socketController.userConnected(uid);

    client.on('disconnect', () => {
        socketController.userConnected(uid);
        console.log('Client desconnected');
    });

});
