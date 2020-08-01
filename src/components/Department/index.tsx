import * as React from "react";
import { ScrollView } from "react-native";
import AppLayout from "modules/AppLayout";
import DepartmentAccordion from "./DepartmentAccordion";
import DepartmentBadge from "./DepartmentBadge";

export default function Department() {
  return (
    <AppLayout title="즐겨찾기" mode="BACK">
      <ScrollView>
        <DepartmentBadge />
        <DepartmentAccordion />
      </ScrollView>
    </AppLayout>
  );
}
