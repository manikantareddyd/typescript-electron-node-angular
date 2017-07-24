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

  @Column
  provider: string;

  @Column
  provider_id: string;

  @Column
  displayName: string;

  @Column
  familyName: string;

  @Column
  givenName: string;

  @Column
  middleName: string;

  @Column
  email: string;

  @Column
  photos: string;
}
