import * as mongoose from 'mongoose';
interface ISocialProfile {
  id: string,
  token: string,
  displayName: string,
  photos: string[]
}

export default interface IUser extends mongoose.Document {
  _id: string,
  username: string,
  password: string,
  emails: string[],
  name: {
    familyName: string,
    givenName: string,
    middlename: string
  },
  facebook: ISocialProfile,
  twitter: ISocialProfile,
  google: ISocialProfile,
  books: {
    owned: string[],
    current: string[],
  }
}