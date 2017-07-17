import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
export default class Villians extends Model<Villians> {
  @Column({ primaryKey: true })
  id: number;

  @Column
  name: string;
}
