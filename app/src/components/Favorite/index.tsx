import * as React from "react";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";
import { Text, ScrollView } from "react-native";

export default function SavedArticles() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "저장된 공지사항",
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <Text>test</Text>
      </ScrollView>
    </AppLayout>
  );
}
