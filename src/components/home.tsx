import * as React from "react";
import { Layout, Text } from "@ui-kitten/components";
import AppLayout from "../modules/AppLayout";

export default function Home() {
  return (
    <AppLayout title="홈" mode="MENU">
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">DETAILS</Text>
      </Layout>
    </AppLayout>
  );
}
