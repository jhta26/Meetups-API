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
server.listen(8000, () => console.log('listening'))


websocket.on('connection', (socket) => {
    socket.on('userJoined',(meetupId)=>onJoinedMeetup(meetupId,socket))
    socket.on('location', (location,userId) => onLocationReceived(location, socket,userId));
    
});

// async function onLocationReceived(location, socket,userId) {
//     var userId = users[socket.id];
//     if (!userId) return;
// try{
//     db('users').update('current_lat_lon',location).where('id',userId);
//     var parts = await db('users').where('id',userId)
//     socket.broadcast.emit('participants', parts)
// }catch(error){
//     throw error
// }
// }
function onLocationReceived(location,socket,userId){
    var userId=users[socket.id]
    if(!userId) return
        return db('users').update('current_lat_lon',location).where('id',userId)
        .then(parts=>{
            return db('users').where('id',userId)
            
        }).then(partss=>{
            socket.broadcast.emit('participants',partss)
        })
}

function onJoinedMeetup(meetupId,socket){
    return db('users').innJoin('participants','users.id','participants.user_id').where('meetup_id',meetupId)
    .then(parts=>{
        socket.emit('userJoined',parts)
    })

}
// async function onJoinedMeetup(meetupId,socket){
 
// var participants=await db('users').innerJoin('participants','users.id','participants.user_id').where('meetup_id',meetupId)
// socket.emit('userJoined',participants)
// }

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