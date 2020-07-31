import * as React from "react";
import AppLayout from "modules/AppLayout";
import DepartAccordion from "./DepartmentAccordion";
import styled from "styled-components/native";

const DepartmentContainer = styled.View`
  margin: 16px;
`;

export default function Department() {
  return (
    <AppLayout title="분류 선택" mode="BACK">
      <DepartmentContainer>
        <DepartAccordion />
      </DepartmentContainer>
    </AppLayout>
  );
}
