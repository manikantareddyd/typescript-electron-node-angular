import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
export default class Users extends Model<Users> {
  @Column({ 
    primaryKey: true 
  })
  id: string;

  @Column({
    unique: true
  })
  username: string;

  @Column
  hashpass: string;

  @Column
  salt: string;
}
