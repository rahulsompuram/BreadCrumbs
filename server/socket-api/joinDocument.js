
const rooms = {};

export default function joinDocument(io, socket) {
  socket.on('joinDocument', function(docId, res) {
    socket.join(docId);
    io.in(docId).clients((err, clientArr) => {
      if (err) {
        console.log('error', err);
      } else {
        clientArr.length > 1 ? socket.emit('liveContent', rooms[docId]) :
          socket.emit('fetch')
      }
    });
  })
}
