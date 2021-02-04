import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Notice {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  attachmentLinks: string[];

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
