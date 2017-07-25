// load the things we need
import * as mongoose from 'mongoose';
import IUser from './users.d';
import * as uuid from 'uuid/v4';

// define the schema for our user model
let userSchema = new mongoose.Schema({
  _id: { type: String, index: true, unique: true },
  username: { type: String, index: true, unique: true },
  hashpass: String,
  salt: String,
  primaryEmail: { type: String, index: true, unique: true },
  emails: [String],
  name: {
    familyName: String,
    givenName: String,
    middlename: String
  },
  facebook: {
    id: { type: String, index: true, unique: true },
    token: String,
    displayName: String,
    photos: [String]
  },
  twitter: {
    id: { type: String, index: true, unique: true },
    token: String,
    displayName: String,
    photos: [String]
  },
  google: {
    id: { type: String, index: true, unique: true },
    token: String,
    displayName: String,
    photos: [String]
  },
  books: {
    owned: [String],
    current: [String],
  }
});
let UserModel = mongoose.model<IUser>('Users', userSchema);
// mongoose.connect('mongodb://localhost:27017/test');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   console.log("connected");
//   let k = new UserModel({
//     _id: uuid(),
//     username: "poop",
//     facebook: {
//       id: uuid()
//     }
//   });
//   k.save().then(u => { console.log("done", u.id) }).catch(e => { console.log("er", e) });
// });
export default UserModel;
