'use strict';

const express     = require('express');
const session     = require('express-session');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const auth        = require('./app/auth.js');
const routes      = require('./app/routes.js');
const mongo       = require('mongodb').MongoClient;
const passport    = require('passport');
const passportSocketIo = require('passport.socketio');
const cookieParser= require('cookie-parser')
const cors        = require('cors');
const app         = express();
const http        = require('http').Server(app);
const io          = require('socket.io')(http);
const sessionStore= new session.MemoryStore();

app.use(cors());
fccTesting(app); //For FCC testing purposes

app.use('/public', express.static(process.cwd() + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  key: 'express.sid',
  store: sessionStore,
}));

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key:          'express.sid',
  secret:       process.env.SESSION_SECRET,
  store:        sessionStore
}));

mongo.connect(process.env.DATABASE, (err, db) => {
    if(err) console.log('Database error: ' + err);
  
    auth(app, db);
    routes(app, db);
      
    http.listen(process.env.PORT || 3000);

  
    //start socket.io code  
    var currentUsers = 0;
    io.on('connection', socket => {
      currentUsers++;
      io.emit('user', {name: socket.request.user.name, currentUsers, connected: true});
      console.log('user ' + socket.request.user.name + ' connected...');
      
      socket.on('disconnect', () => {
        currentUsers--;
        io.emit('user', {name: socket.request.user.name, currentUsers, connected: false});
        console.log('user '+socket.request.user.name+' disconnected...');
      })
      
      socket.on('chat message', (message) => {
        io.emit('chat message', {name: socket.request.user.name, message})
      })
    })
      

    //end socket.io code
  
  
});
