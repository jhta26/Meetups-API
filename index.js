const { JWT_KEY } = require('./env');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const jwt = require('express-jwt');
var socketio = require('socket.io');
const app = express();
var http = require('http')
var server = http.Server(app);
const port = process.env.PORT || 8000;

var websocket = socketio(server);
const db = require('./knex');
server.listen(8000,()=>console.log('listening'))


websocket.on('connection', (socket) => {
    socket.on('location', (location) => onLocationReceived(location, socket));
});

async function onLocationReceived(location, socket) {
   
   
        db('users').update(location, 'current_lat_lon');
        var parts = await db.from('users').innerJoin('participants', 'users.id', 'participants.user_id')
        socket.emit('participants', parts)

}
app.use(bodyParser.json());

app.use(
    jwt({
        secret: JWT_KEY,
        requestProperty: 'jwt.payload',
        credentialsRequired: false,
        audience: 'MeetupsMap',
        issuer: 'MeetupsMap'
    })
);

app.use((req, res, next) => {
    let authUserId = req.jwt ? req.jwt.payload.sub : undefined;
    req.authenticatedUserId =
        Number.isFinite(authUserId) && authUserId > 0 ? authUserId : null;
    next();
});




const authentication = require('./routes/authentication');
const participants = require('./routes/participants');
const meetups = require('./routes/meetups');
const users = require('./routes/users');

app.use(participants);
app.use(meetups);
app.use(users);
app.use(authentication);
app.all('*', (req, res, next) => res.sendStatus(404));



server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;