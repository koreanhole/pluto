import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Notice {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  listId: string;

  @Column()
  deptCode: string;

  @Column()
  deptName: string;

  @Column()
  title: string;

  @Column()
  authorName: string;

  @Column()
  authorDept: string;

  @Column()
  url: string;

  @Column()
  createdDateTime: string;

  //   @Column()
  //   attachmentLink: string[];

  @Column()
  contentHtml: string;

  @Column()
  contentString: string;
}
