import * as React from "react";
import { View, Text, StatusBar, StyleSheet } from "react-native";
import theme from "theme";
import Snackbar from "modules/Snackbar";

type AppLayoutProps = {
  children?: React.ReactNode;
  noDataText?: string;
};

export default function AppLayout(props: AppLayoutProps) {
  const { children, noDataText } = props;

  return (
    <React.Fragment>
      <View style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <StatusBar
          backgroundColor={theme.colors.ligthGrey}
          barStyle="dark-content"
        />
        <View style={AppLayoutStyles.mainSection}>
          {typeof noDataText === "undefined" ? (
            children
          ) : (
            <View style={AppLayoutStyles.noDataContainer}>
              <Text style={AppLayoutStyles.noDataText}>{noDataText}</Text>
            </View>
          )}
        </View>
        <Snackbar />
      </View>
    </React.Fragment>
  );
}

const AppLayoutStyles = StyleSheet.create({
  mainSection: {
    flex: 2,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
