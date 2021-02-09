import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

export class AttachmentLinks {
  fileName: string;
  fileLink: string;
}

@Entity()
export class Notice {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
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
}
