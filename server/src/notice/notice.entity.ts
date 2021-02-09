import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

export enum DeptType {
  General = '전체공지',
  Engineering = '공과대학',
  Economics = '정경대학',
  Humanitics = '인문대학',
  NaturalScience = '자연과학대학',
  Business = '경영대학',
  InterChange = '국제교류과',
  Dormitory = '생활관',
}

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
