import React from "react";
import { SafeAreaView } from "react-native";
import {
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  IconProps,
} from "@ui-kitten/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigation";

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Details"
>;

type Props = {
  navigation: DetailsScreenNavigationProp;
};

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;

export const DetailsScreen = ({ navigation }: Props) => {
  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="MyApp"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text category="h1">DETAILS</Text>
      </Layout>
    </SafeAreaView>
  );
};
