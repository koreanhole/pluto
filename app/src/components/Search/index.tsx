import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Search() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: null,
    });
  });

  return (
    <AppLayout>
      <ScrollView>
        <Text>검색창</Text>
      </ScrollView>
    </AppLayout>
  );
}
