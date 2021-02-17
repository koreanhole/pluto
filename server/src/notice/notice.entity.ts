import { Column, Entity, PrimaryColumn } from 'typeorm';

export class AttachmentLinks {
  fileName: string;
  fileLink: string;
}

@Entity()
export class Notice {
  @PrimaryColumn()
  id: string;

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
}
