import { firebase } from "./config";

export const noticeFirestore = firebase.firestore().collection("notice");
