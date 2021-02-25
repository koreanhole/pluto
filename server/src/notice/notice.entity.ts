import { Field, ObjectType, ID } from '@nestjs/graphql';
import { toGlobalId } from 'graphql-relay';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Node } from '../nodes/node.model';

export class AttachmentLinks {
  fileName: string;
  fileLink: string;
}

@Entity()
@ObjectType({ implements: Node })
export class Notice implements Node {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('jsonb')
  attachmentLinks: AttachmentLinks[];

  @Column()
  authorDept: string;

  @Column()
  authorName: string;

  @Column()
  contentHtml: string;

  @Column()
  contentString: string;

  @Column()
  createdDatetime: string;

  @Column()
  listId: string;

  @Column()
  department: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Field(() => ID, { name: 'id' })
  get relayId(): string {
    return toGlobalId('Notice', this.id);
  }
}
