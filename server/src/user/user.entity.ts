import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  deviceId: string;

  @Column()
  expoPushToken: string;

  @Column()
  departments: string[];
}
