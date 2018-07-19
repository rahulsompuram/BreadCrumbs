
const rooms = {};

export default function joinDocument(io, socket) {
  socket.on('joinDocument', function(docInfoArr, res) {
    rooms[docInfoArr[0]] = docInfoArr[1];
    socket.join(docInfoArr[0]);
    io.in(docInfoArr[0]).clients((err, clientArr) => {
      if (err) {
        console.log('error', err);
      } else {
        clientArr.length > 1 ? socket.emit('liveContent', rooms[docInfoArr[0]]) :
          socket.emit('fetch')
      }
    });
  })
}
