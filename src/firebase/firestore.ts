import { firebase } from "./config";

export const noticeFirestore = firebase
  .firestore()
  .doc("/notice/department_type/");
