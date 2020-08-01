import * as React from "react";
import { ScrollView } from "react-native";
import AppLayout from "modules/AppLayout";
import DepartmentAccordion from "./DepartmentAccordion";
import DepartmentBadge from "./DepartmentBadge";
import styled from "styled-components/native";

const DepartmentContainer = styled.View`
  margin: 16px;
`;

export default function Department() {
  return (
    <AppLayout title="분류 선택" mode="BACK">
      <ScrollView>
        <DepartmentContainer>
          <DepartmentBadge />
          <DepartmentAccordion />
        </DepartmentContainer>
      </ScrollView>
    </AppLayout>
  );
}
