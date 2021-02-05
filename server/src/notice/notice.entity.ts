import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

class AttachmentLinks {
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
  deptCode: string;

  @Column()
  deptName: string;

  @Column()
  listId: string;

  @Column()
  title: string;

  @Column()
  url: string;
}
