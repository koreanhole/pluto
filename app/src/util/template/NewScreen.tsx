import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NewScreen() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "headerTitle",
      //   headerRight: () => <HeaderRightButton />,
    });
  });

  return (
    <AppLayout>
      <ScrollView></ScrollView>
    </AppLayout>
  );
}
