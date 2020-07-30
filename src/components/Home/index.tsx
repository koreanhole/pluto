import * as React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import AppLayout from "modules/AppLayout";
import NoticeCard from "./NoticeCard";
import { ScrollView, View, Button } from "react-native";
import styled from "styled-components/native";

const HomeContainer = styled(View)`
  flex: 1;
`;

export default function Home({ navigation }: NavigationStackProp) {
  return (
    <AppLayout title="홈" mode="MENU" navigation={navigation}>
      <HomeContainer>
        <ScrollView>
          <NoticeCard />
          <Button
            title="go to article"
            onPress={() => navigation.navigate("Article")}
          />
        </ScrollView>
      </HomeContainer>
    </AppLayout>
  );
}
