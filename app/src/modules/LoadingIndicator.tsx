import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import theme from "theme";

export default function LoadingIndicator() {
  return (
    <View style={LoadingStyles.container}>
      <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
    </View>
  );
}

const LoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
