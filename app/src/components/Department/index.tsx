import * as React from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "modules/AppLayout";
import DepartmentAccordion from "./DepartmentAccordion";
import DepartmentBadge from "./DepartmentBadge";
import { useNavigation } from "@react-navigation/native";
import { getFavoriteDepartmentList, getExpoPushToken } from "./redux/selectors";
import { userDataFirestore } from "util/firebase/firestore";

export default function Department() {
  const navigation = useNavigation();
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);
  const expoPushToken = useSelector(getExpoPushToken);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "즐겨찾기",
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
    </AppLayout>
  );
}
