
const rooms = {};

export default function joinDocument(io, socket) {
  socket.on('openDocument', function(docId) {
    io.in(docId).clients((err, clientArr) => {
      console.log('CLIENT ARRAY', clientArr)
      if (err) {
        console.log('error', err);
      } else {
        if (clientArr.length < 6){
        socket.join(docId);
        (clientArr.length > 0 && rooms[docId]) ? socket.emit('liveContent', rooms[docId]) : socket.emit('fetch');
          console.log('most recent content sent to client.')
        } else {
          socket.emit('message', "The maximum number of users (6) per open session has already been reached");
        }
      }
    });
  })

  socket.on('editDocument', function(docInfoArr){
    rooms[docInfoArr[0]] = docInfoArr[1];
    console.log('DOCID', docInfoArr[0])
    console.log('IN EDITDOCUMENT!!!!',rooms[docInfoArr[0]].blocks[0].text)
    socket.to(docInfoArr[0]).emit('liveContent', rooms[docInfoArr[0]]);
  })

  socket.on('closeDocument', (docId) => {
    //need to finish this part!
    socket.leave(docId)
  })
}
