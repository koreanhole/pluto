import * as React from "react";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";

export default function Settings() {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "설정",
    });
  });
  return <AppLayout noDataText="설정" />;
}
