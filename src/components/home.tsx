import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export const HomeScreen = ({ navigation }: Props) => {
  const navigateDetails = () => {
    navigation.navigate("Details");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="My?App" alignment="center" />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={navigateDetails}>OPEN DETAILS</Button>
      </Layout>
    </SafeAreaView>
  );
};
