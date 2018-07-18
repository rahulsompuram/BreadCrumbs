import User from '../../model/user';

export default function auth(socket) {
  socket.on('login', function(data, res) {
    User.findOne({username: data.username, password: data.password})
    .then(user => user ? res('MyEditor') : res('nope'))
    .catch(err => res({ok: false, error: err}))
  })
}
