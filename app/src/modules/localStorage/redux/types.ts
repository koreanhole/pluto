import { NoticeArticle } from "components/Article/redux/types";

export type LocalStorageDataType = "ARTICLE" | "FAVORITE_DEPARTMENT_LIST";
export type LocalStorageData = string | NoticeArticle;

export type storeLocalStorageRequestPayload = {
  dataType: LocalStorageDataType;
  data: LocalStorageData;
};

export type deleteLocalStorageRequestPayload = {
  dataType: LocalStorageDataType;
  data: string;
};
