import * as React from "react";
import { ScrollView } from "react-native";
import AppLayout from "modules/AppLayout";
import DepartmentAccordion from "./DepartmentAccordion";
import DepartmentBadge from "./DepartmentBadge";
import { useNavigation } from "@react-navigation/native";

export default function Department() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "즐겨찾기",
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <DepartmentBadge />
        <DepartmentAccordion />
      </ScrollView>
    </AppLayout>
  );
}
