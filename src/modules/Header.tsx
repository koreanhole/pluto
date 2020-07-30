import * as React from "react";
import { NavigationStackProp } from "react-navigation-stack";
import { Header as RNElementHeader, Icon, Text } from "react-native-elements";
import styled from "styled-components/native";

export type HeaderMode = "MENU" | "BACK";

type HeaderProps = {
  title: string;
  mode: HeaderMode;
  navigation?: NavigationStackProp;
};

type HeaderLeftButtonProps = {
  mode: HeaderMode;
  navigation: NavigationStackProp;
};

const StyledHeaderTitle = styled(Text)`
  color: #2b2926;
  font-size: 20px;
  font-weight: bold;
`;

const StyledHeaderIcon = styled(Icon)`
  color: #2b2926;
`;

function HeaderLeftButton({ mode, navigation }: HeaderLeftButtonProps) {
  const handleBackButtonClick = React.useCallback(() => {
    navigation.goBack();
  }, []);

  switch (mode) {
    case "MENU": {
      return <StyledHeaderIcon name="menu" type="material" />;
    }
    case "BACK": {
      return (
        <StyledHeaderIcon
          name="arrow-back"
          type="material"
          onPress={handleBackButtonClick}
        />
      );
    }
  }
}

function HeaderTitle({ title }: { title: string }) {
  return <StyledHeaderTitle>{title}</StyledHeaderTitle>;
}

export default function Header({ title, mode, navigation }: HeaderProps) {
  return (
    <RNElementHeader
      placement="left"
      barStyle="dark-content"
      leftComponent={<HeaderLeftButton mode={mode} navigation={navigation} />}
      centerComponent={<HeaderTitle title={title} />}
      containerStyle={{
        backgroundColor: "#fff",
      }}
    />
  );
}
