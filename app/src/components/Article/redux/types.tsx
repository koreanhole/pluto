export type Attachment = {
  file_link: string;
  file_name: string;
};

export type NoticeArticle = {
  attachmentLink?: Attachment[];
  authorDept: string;
  authorName: string;
  contentHtml?: string;
  contentString?: string;
  createdDate: string;
  createdDateTimestamp?: string;
  listId: string;
  title: string;
  deptCode: string;
  deptName: string;
  url?: string;
  favoriteCount?: number;
};
