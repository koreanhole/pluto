import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Node } from '../nodes/node.model';
import { toGlobalId } from 'graphql-relay';

@Entity()
@ObjectType({ implements: Node })
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  expoPushToken: string;

  @Column('simple-array', { nullable: false })
  departments: string[];

  @Field(() => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('User', this.id);
  }
}
