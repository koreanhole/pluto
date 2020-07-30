import * as React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import AppLayout from "modules/AppLayout";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import styled from "styled-components/native";

export default function Article({ navigation }: NavigationStackProp) {
  return (
    <AppLayout title="제목입니다." mode="BACK" navigation={navigation}>
      <ScrollView>
        <Text>내용입니다.</Text>
      </ScrollView>
    </AppLayout>
  );
}
