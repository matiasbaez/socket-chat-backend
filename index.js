const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Lectura y parseo del Body
app.use( express.json() );

// Node Server
const server = require('http').createServer(app);

// Public Path
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

// Routes
app.use( '/api/login', require('./routes/auth') );

server.listen( process.env.PORT, ( err ) => {
    if ( err ) throw new Error(err);
    console.log('Server listening: ', process.env.PORT );
});
