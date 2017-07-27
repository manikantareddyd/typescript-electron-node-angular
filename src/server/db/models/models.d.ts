import * as mongoose from 'mongoose';

export interface IHero extends mongoose.Document {
    id: string,
    name: string
}

interface ISocialProfile {
  id: string,
  token: string,
  displayName: string,
  photos: [{
      value: string
  }],
  emails:[{
    value: string,
    type: string
  }]
}

export interface IUser extends mongoose.Document {
  _id: string,
  username: string,
  password: string,
  primaryEmail: string,
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