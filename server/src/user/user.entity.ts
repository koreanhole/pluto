import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  expoPushToken: string;

  @Column('simple-array', { nullable: false })
  departments: string[];
}
