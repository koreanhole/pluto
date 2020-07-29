import * as React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import TopNavigationBar from "./TopNavigationBar";
import { TopNavigationBarMode } from "./TopNavigationBar";

type AppLayoutProps = {
  title: string;
  mode: TopNavigationBarMode;
  children?: React.ReactNode;
};

export default function AppLayout(props: AppLayoutProps) {
  const { title, mode, children } = props;

  return (
    <React.Fragment>
      <SafeAreaView style={[{ flex: 0 }, { backgroundColor: "#e5e5e5" }]} />
      <SafeAreaView style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <StatusBar barStyle="dark-content" />
        <TopNavigationBar title={title} mode={mode} />
        {children}
      </SafeAreaView>
    </React.Fragment>
  );
}
