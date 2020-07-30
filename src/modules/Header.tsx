import * as React from "react";
import { Header as RNElementHeader, Icon, Text } from "react-native-elements";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export type HeaderMode = "MENU" | "BACK";

type HeaderProps = {
  title: string;
  mode: HeaderMode;
};

type HeaderLeftButtonProps = {
  mode: HeaderMode;
};

const StyledHeaderTitle = styled(Text)`
  color: #2b2926;
  font-size: 20px;
  font-weight: bold;
`;

const StyledHeaderIcon = styled(Icon)`
  color: #2b2926;
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
  }
}

function HeaderTitle({ title }: { title: string }) {
  return <StyledHeaderTitle>{title}</StyledHeaderTitle>;
}

export default function Header({ title, mode }: HeaderProps) {
  return (
    <RNElementHeader
      placement="left"
      barStyle="dark-content"
      leftComponent={<HeaderLeftButton mode={mode} />}
      centerComponent={<HeaderTitle title={title} />}
      containerStyle={{
        backgroundColor: "#fff",
      }}
    />
  );
}
