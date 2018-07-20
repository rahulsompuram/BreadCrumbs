import Document from '../../model/document';

const rooms = {};

export default function joinDocument(io, socket) {
  socket.on('openDocument', function(docId) {
    io.in(docId).clients((err, clientArr) => {
      console.log('CLIENT ARRAY', clientArr)
      if (err) {
        console.log('error in openDocument socket', err);
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

  socket.on('editDocument', function(doc){
    rooms[doc.docId] = doc.editorState;
    console.log('IN EDITDOCUMENT!!!!',rooms[doc.docId].blocks[0].text)
    socket.to(doc.docId).emit('liveContent', rooms[doc.docId]);
  })

  socket.on('closeDocument', (doc) => {
    socket.leave(doc.docId)
    console.log('left document')
    io.in(doc.docId).clients((err, clientArr) => {
      if (err) {
        console.log('error in closeDocument clients socket: ', err);
      } else {
        if(clientArr.length === 0 && rooms[doc.docId]){
          let content = Object.assign({ editorState: rooms[doc.docId], saveTime: Date() }, doc)
          Document.findOneAndUpdate({_id: doc.docId}, { $push: { content }})
          .then(err => {
            console.log('response of findOneAndUpdate: ', err)
            delete rooms[doc.docId];
          })
        }
      }
    })
  })
}
