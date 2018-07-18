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
  User.findOne({ username: req.body.username })
  .then(user => {
    if(user){
      res.send({success: false, message: "This username has already been taken."});
    } else {
      let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        fName: req.body.fName,
        lName: req.body.lName
      })
      newUser.save()
      .then(result => res.send({success: true, user: result}))
      .catch(err => res.send({success: false, error: err}))
    }
  })
  .catch(err => console.log('Catch in POST REG request', err))
})

router.post('/createDoc', (req, res) => {
  Document.findOne({ owner: req.body.owner, title: req.body.title })
    .then(doc => {
      if(doc){
        res.send({success: false, message: "This title is being used."})
      } else {
        let newDoc = new Document({
          title: req.body.title,
          password: req.body.password,
          // collaboratorList: Promise.all(req.body.collaboratorStr.split(",").map(user => {
          //   return User.findOne({username: user.trim()})
          //   .then(user => user ? user._id : null)
          //   .catch(err => res.send({ "error": err }))
          // }))
          // .then(result => result.concat(req.body.owner)),
          owner: req.body.owner
        });
        newDoc.save()
        .then(result => res.send({success: true, docSave: result}))
        .catch(err => res.send({success: false, errorSaving: err}))
      }
    })
})

export default router
