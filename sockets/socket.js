const { io } = require('../index');

// Sockets Messages
io.on('connection', client => {
    console.log('Client connected');

    client.on('disconnect', () => {
        console.log('Client desconnected');
    });

});
