import * as React from "react";
import styled from "styled-components/native";
import { Linking } from "react-native";
import { Icon } from "react-native-elements";

const HeaderRightButtonContainer = styled.View`
  flex-direction: row;
`;

export default function HeaderRightButton() {
  const handleOpenUrlClicked = React.useCallback(() => {
    Linking.openURL("https://naver.com").catch((err) =>
      console.error("Couldn't load page", err)
    );
  }, []);
  return (
    <HeaderRightButtonContainer>
      <Icon name="public" type="material" onPress={handleOpenUrlClicked} />
    </HeaderRightButtonContainer>
  );
}
