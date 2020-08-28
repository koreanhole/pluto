import * as React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { StatusBar } from "expo-status-bar";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const MainSection = styled(View)`
  flex: 2;
`;

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;

  return (
    <React.Fragment>
      <View style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <MainSection>{children}</MainSection>
        <StatusBar style="auto" />
      </View>
    </React.Fragment>
  );
}
