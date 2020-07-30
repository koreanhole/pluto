import * as React from "react";
import AppLayout from "modules/AppLayout";
import NoticeCard from "./NoticeCard";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home() {
  return (
    <AppLayout title="홈" mode="MENU">
      <HomeContainer>
        <ScrollView>
          <NoticeCard />
        </ScrollView>
      </HomeContainer>
    </AppLayout>
  );
}
