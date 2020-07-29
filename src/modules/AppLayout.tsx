import * as React from "react";
import { SafeAreaView, View } from "react-native";
import Header from "./Header";
import { HeaderMode } from "./Header";
import styled from "styled-components/native";

type AppLayoutProps = {
  title: string;
  mode: HeaderMode;
  children?: React.ReactNode;
};

const MainSection = styled(View)`
  flex: 2;
`;

export default function AppLayout(props: AppLayoutProps) {
  const { title, mode, children } = props;

  return (
    <React.Fragment>
      <SafeAreaView style={[{ flex: 0 }, { backgroundColor: "#e5e5e5" }]} />
      <SafeAreaView style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <Header title={title} mode={mode} />
        <MainSection>{children}</MainSection>
      </SafeAreaView>
    </React.Fragment>
  );
}
