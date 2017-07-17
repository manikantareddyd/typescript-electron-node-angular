import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
export default class Heroes extends Model<Heroes> {
  @Column({ primaryKey: true })
  id: number;

  @Column
  name: string;
}
