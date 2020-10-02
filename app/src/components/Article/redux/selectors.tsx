import { RootState } from "redux/types";

export const getSavedArticle = (state: RootState) => state.article.savedNotice;
