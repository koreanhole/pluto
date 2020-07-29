import * as React from "react";
import { Header as RNElementHeader, Icon, Text } from "react-native-elements";
import styled from "styled-components/native";

export type HeaderMode = "MENU" | "BACK";

type HeaderProps = {
  title: string;
  mode: HeaderMode;
};

const StyledHeader = styled(RNElementHeader)`
  background-color: #e5e5e5;
`;

const StyledHeaderTitle = styled(Text)`
  flex: 2;
  color: #2b2926;
  font-size: 20px;
  font-weight: bold;
`;

const StyledHeaderIcon = styled(Icon)`
  flex: 2;
  color: #2b2926;
`;

function HeaderLeftIcon({ mode }: { mode: HeaderMode }) {
  switch (mode) {
    case "MENU": {
      return <StyledHeaderIcon name="menu" type="material" />;
    }
    case "BACK": {
      return <StyledHeaderIcon name="arrow-back" type="material" />;
    }
  }
}

function HeaderTitle({ title }: { title: string }) {
  return <StyledHeaderTitle>{title}</StyledHeaderTitle>;
}

export default function Header({ title, mode }: HeaderProps) {
  return (
    <StyledHeader
      placement="left"
      barStyle="dark-content"
      leftComponent={<HeaderLeftIcon mode={mode} />}
      centerComponent={<HeaderTitle title={title} />}
      containerStyle={{
        backgroundColor: "#e5e5e5",
        justifyContent: "space-around",
      }}
    />
  );
}
