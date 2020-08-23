import { firebase } from "./config";

export const noticeFirestore = firebase.firestore().collection("notice");

export const userDataFirestore = firebase.firestore().collection("userData");
