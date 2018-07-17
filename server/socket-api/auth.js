import mongoose from 'mongoose';
if (! process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not in the environmental variables. Try running 'source env.sh'");
}
mongoose.connection.on('connected', function() {
  console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function() {
  console.log('Error connecting to MongoDb. Check MONGODB_URI in env.sh');
  process.exit(1);
});
mongoose.connect(process.env.MONGODB_URI);



export default function auth(socket) {
  socket.on('login', function(data, res) {
    if(User.findOne({username: data.username, password: data.password}).length) res({ok: true})
    else res({ok: false})
  })
}
