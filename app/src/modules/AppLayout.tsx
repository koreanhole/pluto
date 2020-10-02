import * as React from "react";
import { View, StatusBar } from "react-native";
import styled from "styled-components/native";
import theme from "theme";
import Snackbar from "modules/Snackbar";

type AppLayoutProps = {
  children?: React.ReactNode;
};

const MainSection = styled(View)`
  flex: 2;
`;

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;

  return (
    <React.Fragment>
      <View style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <StatusBar
          backgroundColor={theme.colors.ligthGrey}
          barStyle="dark-content"
        />
        <MainSection>{children}</MainSection>
        <Snackbar />
      </View>
    </React.Fragment>
  );
}
