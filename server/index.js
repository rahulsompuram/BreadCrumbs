import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import {auth, joinDocument} from './socket-api';
import routes from './routes';
import Document from '../model/document';
import User from '../model/user';

const app = express()
const server = http.Server(app)
const io = socketIO(server)

io.on('connection', function (socket) {
  console.log('Client connected');
  auth(socket)
  joinDocument(io, socket)
})

app.use(routes)

server.listen(process.env.PORT || 1337)
console.log('Listening on PORT 1337')
