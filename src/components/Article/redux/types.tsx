export type NoticeArticle = {
  attachmentLink: string[];
  authorDept: string;
  authorName: string;
  contentHtml: string;
  contentString: string;
  createdDate: string;
  listId: string;
  title: string;
  deptCode: string;
  deptName: string;
};

export type ArticleId = {
  deptName: string;
  listId: string;
};
