// load the things we need
import * as mongoose from 'mongoose';
import {IUser} from './models.d';
import * as uuid from 'uuid/v4';

// define the schema for our user model
let userSchema = new mongoose.Schema({
  _id: { type: String, index: true, unique: true },
  username: { type: String, index: true, unique: true },
  hashpass: String,
  salt: String,
  primaryEmail: { type: String, index: true, unique: true },
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
export default UserModel;
