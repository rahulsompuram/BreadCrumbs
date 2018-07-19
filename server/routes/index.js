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


router.post('/userDocs', (req, res) => {
  var userDocuments = [];
  Document.find({collaboratorList: req.body.owner})
    .then((docs) => res.send(docs))
    .catch(err => {
      console.log(err)
    })
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
          owner: req.body.owner,
          createdTime: Date(),
          lastEditTime: Date(),
          collaboratorList: [req.body.owner]
        });

        newDoc.save()
        .then(result => res.send({success: true, result: result, docId: newDoc._id}))
        .catch(err => res.send({success: false, errorSaving: err}))
      }
    })
})

router.post('/shareable', (req, res) => {
  Document.findOne({_id: req.body.shareableId})
    .then(doc => {
      if (doc) {
        if (doc.password === req.body.password) {
          if (doc.collaboratorList.indexOf(req.body.currentUserId) === -1) {
            doc.collaboratorList.push(req.body.currentUserId);
            doc.save()
              .then(() => res.send({message: "Success", doc: doc}))
              .catch((err) => res.send({ 'saving to DB error': err}))
          } else {
            res.send({message: "Already in DB"})
          }
        } else {
          console.log('Incorrect shareable password');
        }
      } else {
        console.log('Document was not found');
      }
    })
    .catch(err => res.send({ 'server error': err }))
})

router.post('/saveDoc', (req, res) => {
  //Push a state onto the contents arr
  Document.findOne({_id: req.body.docId})
    .then(doc => {
      if (doc) {
        doc.content.push(req.body);
        doc.save()
          .then(() => res.send({message: "Saved!"}))
          .catch((err) => res.send({ 'saving to DB error': err}))
      } else {
        console.log('Document was not found');
      }
    })
    .catch((err) => res.send({ 'save doc server error': err}))
})

router.get('/loadDoc', (req, res) => {
  //Get the most recent state from the content Array
  Document.findOne({_id: req.query.docId})
    .then(doc => {
      if (doc && doc.content.length !== 0) {
        res.send({message: "Success", docEditorState: doc.content[doc.content.length - 1]})
      } else {
        res.send({message: "No document"})
      }
    })
    .catch((err) => res.send({ 'save doc server error': err}))
})

export default router
