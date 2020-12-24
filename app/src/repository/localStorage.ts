import AsyncStorage from "@react-native-async-storage/async-storage";
import { NoticeArticle } from "components/Article/redux/types";

type FavoriteDepartmentList = string[];
export type AsyncStorageDataType = "ARTICLE" | "FAVORITE_DEPARTMENT_LIST";

type AsyncStoragePayload = {
  dataType: AsyncStorageDataType;
  data: FavoriteDepartmentList | NoticeArticle[];
};

export async function saveAsyncStorageData(payload: AsyncStoragePayload) {
  const { dataType, data } = payload;
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem(dataType, jsonValue);
}

export async function getAsyncStorageData(dataType: AsyncStorageDataType) {
  const jsonValue = await AsyncStorage.getItem(dataType);
  return jsonValue !== null ? JSON.parse(jsonValue) : null;
}
