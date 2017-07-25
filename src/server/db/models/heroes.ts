import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import * as mongoose from 'mongoose';
import { IHero } from './models.d'

let heroSchema = new mongoose.Schema({
  id: String,
  name: String
});

export default mongoose.model<IHero>("heroes", heroSchema);