type PageType = "HOME" | "ALL_ARTICLE";

//TODO: graphql 이사 완료 이후 타입 정리

export type Attachment = {
  file_link: string;
  file_name: string;
};

type Attachment_Gql = {
  fileName: string;
  fileLink: string;
};

type department_Gql = {
  deptCode: string;
  deptType: string;
  id: string;
};

type NoticeArtice_Gql = {
  id: string;
  attachmentLink?: Attachment_Gql[];
  authorDept: string;
  authorName: string;
  contentHtml?: string;
  contentString?: string;
  createdDatetime: string;
  listId: string;
  title: string;
  department: department_Gql;
  url?: string;
};

export type NoticeArticleData = {
  getNoticeByDepartmentName: NoticeArtice_Gql[];
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
};

export type FetchInitialNoticeListRequestPayload = {
  departmentList: string[];
  pageType: PageType;
};

export type FetchInitialNoticeListSuccessPayload = {
  noticeArticles: NoticeArticle[] | null;
  pageType: PageType;
};

export type FetchNoticeRequestPayload = {
  deptCode: string;
  listId: string;
};

export type SavedArticleSorting = "ASCENDING" | "DESCENDING";
