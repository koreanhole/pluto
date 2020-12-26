import * as React from "react";
import { View, StyleSheet } from "react-native";
import theme from "theme";

export default function Divider() {
  return <View style={DividerStyles.Container} />;
}

const DividerStyles = StyleSheet.create({
  Container: {
    backgroundColor: theme.colors.ligthGrey,
    height: 1,
  },
});
