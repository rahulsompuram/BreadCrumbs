import {Router} from 'express'
const router = new Router()

import bodyParser from 'body-parser';
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

//setup for MongoDB
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

import Document from '../../model/document';
import User from '../../model/user';




router.get('/ping', (req, res) => {
  res.send('pong')
})

router.post('/register', (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  })
  newUser.save()
  .then(result => res.send({success: true, user: result}))
  .catch(err => res.send({success: false, error: err}))
})

export default router
