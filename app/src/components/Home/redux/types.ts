import { NoticeArticle } from "components/Article/redux/types";

type PageType = "HOME" | "ALL_ARTICLE";

export type FetchInitialNoticePayload = {
  departmentList: string[];
  pageType: PageType;
};

export type FetchInitialNoticeSuccessPayload = {
  noticeArticles: NoticeArticle[] | null;
  pageType: PageType;
};
