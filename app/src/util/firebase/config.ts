import firebase from "firebase";
import "@firebase/firestore";
import * as FirebaseCore from "expo-firebase-core";

const firebaseConfig = FirebaseCore.DEFAULT_APP_OPTIONS;
if (!firebase.apps.length) {
  if (typeof firebaseConfig !== "undefined") {
    firebase.initializeApp(firebaseConfig);
  }
}

export { firebase };
