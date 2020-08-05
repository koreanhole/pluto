export type NoticeArticle = {
  attachmentLink: string[];
  authorDept: string;
  authorName: string;
  contentHtml: string;
  contentString: string;
  createdDate: string;
  listId: string;
  title: string;
  type: string;
};

export type ArticleId = {
  type: string;
  listId: string;
};
