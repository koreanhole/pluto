import { NoticeArticle } from "components/Article/redux/types";

type PageType = "HOME" | "DEPARTMENT";

export type SearchNoticeRequestPayload = {
  query: string;
  departmentList: string[];
  pageType: PageType;
};

export type SearchNoticeSuccessPayload = {
  noticeArticles: NoticeArticle[] | null;
  pageType: PageType;
};
