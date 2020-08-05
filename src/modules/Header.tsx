import * as React from "react";
import { Header as RNElementHeader, Icon, Text } from "react-native-elements";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "react-native-elements";
import theme from "theme";

export type HeaderMode = "MENU" | "BACK" | "NONE";

type HeaderProps = {
  title?: string;
  mode: HeaderMode;
  rightComponent?: React.ReactElement;
};

type HeaderLeftButtonProps = {
  mode: HeaderMode;
};

const StyledHeaderTitle = styled(Text)`
  color: ${theme.colors.black};
  font-size: 20px;
  font-weight: bold;
`;

const StyledHeaderIcon = styled(Icon)`
  color: ${theme.colors.black};
`;

function HeaderLeftButton({ mode }: HeaderLeftButtonProps) {
  const navigation = useNavigation();

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
    case "NONE": {
      return null;
    }
  }
}

function HeaderTitle({ title }: { title?: string }) {
  return <StyledHeaderTitle>{title}</StyledHeaderTitle>;
}

export default function Header({ title, mode, rightComponent }: HeaderProps) {
  return (
    <>
      <RNElementHeader
        placement="left"
        barStyle="dark-content"
        leftComponent={<HeaderLeftButton mode={mode} />}
        centerComponent={<HeaderTitle title={title} />}
        rightComponent={rightComponent}
        containerStyle={{
          backgroundColor: theme.colors.ligthGrey,
        }}
      />
      <Divider />
    </>
  );
}
