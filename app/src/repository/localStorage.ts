import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  storeLocalStorageRequestPayload,
  LocalStorageDataType,
} from "modules/localStorage/redux/types";

export async function saveAsyncStorageData(
  payload: storeLocalStorageRequestPayload
) {
  const { dataType, data } = payload;
  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem(dataType, jsonValue);
}

export async function getAsyncStorageData(dataType: LocalStorageDataType) {
  const jsonValue = await AsyncStorage.getItem(dataType);
  return jsonValue !== null ? JSON.parse(jsonValue) : null;
}
