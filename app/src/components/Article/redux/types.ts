type PageType = "HOME" | "ALL_ARTICLE";

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

export type FetchInitialNoticeListPayload = {
  departmentList: string[];
  pageType: PageType;
};

export type FetchInitialNoticeListSuccessPayload = {
  noticeArticles: NoticeArticle[] | null;
  pageType: PageType;
};
