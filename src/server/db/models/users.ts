// load the things we need
import * as mongoose from 'mongoose';
import { IUser } from './models.d';
import * as uuid from 'uuid/v4';


// define the schema for our user model
let userSchema = new mongoose.Schema({
    id: { type: String, index: true, unique: true },
    username: { type: String, index: true },
    hashpass: String,
    salt: String,
    resetTokenHash: String,
    name: {
        familyName: String,
        givenName: String,
        middlename: String
    },
    facebook: {
        id: { type: String, index: true },
        token: String,
        displayName: String,
        photos: [{
            value: String
        }],
        emails: [{
            value: String
        }]
    },
    twitter: {
        id: { type: String, index: true },
        token: String,
        displayName: String,
        photos: [{
            value: String
        }],
        emails: [{
            value: String
        }]
    },
    google: {
        id: { type: String, index: true },
        token: String,
        displayName: String,
        photos: [{
            value: String
        }],
        emails: [{
            value: String
        }]
    },
    books: {
        owned: [String],
        current: [String],
    }
});

let UserModel = mongoose.model<IUser>('Users', userSchema);
export default UserModel;
