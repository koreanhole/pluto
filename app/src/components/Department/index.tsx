import * as React from "react";
import { ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppLayout from "modules/AppLayout";
import DepartmentAccordion from "./DepartmentAccordion";
import DepartmentBadge from "./DepartmentBadge";
import { useNavigation } from "@react-navigation/native";
import { updateUserDataAsync } from "./redux/actions";
import { getFavoriteDepartmentList, getExpoPushToken } from "./redux/selectors";

export default function Department() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);
  const expoPushToken = useSelector(getExpoPushToken);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
    });
  });

  React.useEffect(() => {
    if (typeof expoPushToken !== "undefined" && expoPushToken !== null) {
      dispatch(
        updateUserDataAsync.request({
          favoriteDepartmentList: favoriteDepartmentList,
          expoPushToken: expoPushToken,
        }),
      );
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
