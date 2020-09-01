import * as React from "react";
import { ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import { Snackbar } from "react-native-paper";
import DepartmentAccordion from "./DepartmentAccordion";
import DepartmentBadge from "./DepartmentBadge";
import { useNavigation } from "@react-navigation/native";
import { setShowSnackBar } from "./redux/actions";
import {
  getFavoriteDepartmentList,
  getExpoPushToken,
  getShowSnackBar,
} from "./redux/selectors";
import { userDataFirestore } from "util/firebase/firestore";

export default function Department() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);
  const expoPushToken = useSelector(getExpoPushToken);
  const showSnackBar = useSelector(getShowSnackBar);

  const handleDismissSnackbar = React.useCallback(() => {
    dispatch(setShowSnackBar(false));
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "즐겨찾기 / 알림",
    });
  });

  React.useEffect(() => {
    if (typeof expoPushToken !== "undefined" && expoPushToken !== null) {
      userDataFirestore.doc(expoPushToken).set({
        favoriteDepartmentList: favoriteDepartmentList,
        expoPushToken: expoPushToken,
      });
    }
  }, [favoriteDepartmentList]);

  return (
    <AppLayout>
      <ScrollView>
        <DepartmentBadge />
        <DepartmentAccordion />
      </ScrollView>
      {showSnackBar && (
        <Snackbar
          visible={showSnackBar}
          onDismiss={handleDismissSnackbar}
          duration={1000}
        >
          새로운 공지사항에 대해 알림을 수신합니다.
        </Snackbar>
      )}
    </AppLayout>
  );
}
