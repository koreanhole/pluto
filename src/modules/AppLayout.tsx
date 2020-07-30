import * as React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { View } from "react-native";
import Header, { HeaderMode } from "./Header";
import styled from "styled-components/native";

type AppLayoutProps = {
  title: string;
  mode: HeaderMode;
  children?: React.ReactNode;
  navigation: NavigationStackProp;
};

const MainSection = styled(View)`
  flex: 2;
`;

export default function AppLayout(props: AppLayoutProps) {
  const { title, mode, children, navigation } = props;

  return (
    <React.Fragment>
      <View style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <Header title={title} mode={mode} navigation={navigation} />
        <MainSection>{children}</MainSection>
      </View>
    </React.Fragment>
  );
}
