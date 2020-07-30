import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import styled from "styled-components/native";

export default function Article() {
  return (
    <AppLayout title="제목입니다." mode="BACK">
      <ScrollView>
        <Text>내용입니다.</Text>
      </ScrollView>
    </AppLayout>
  );
}
