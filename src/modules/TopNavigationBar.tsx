import * as React from "react";
import {
  TopNavigation,
  TopNavigationProps,
  Icon,
  IconProps,
  TopNavigationAction,
} from "@ui-kitten/components";
import styled from "styled-components";

export type TopNavigationBarMode = "MENU" | "BACK";

type TopNavigationBarProps = {
  title: string;
  mode: TopNavigationBarMode;
};

const StyledTopNavigation = styled(TopNavigation)<TopNavigationProps>`
  background-color: #e5e5e5;
`;

const BackIcon = (props: IconProps) => <Icon {...props} name="arrow-back" />;
const MenuIcon = (props: IconProps) => <Icon {...props} name="menu" />;

export default function TopNavigationBar({
  title,
  mode,
}: TopNavigationBarProps) {
  const BackIconAction = () => <TopNavigationAction icon={BackIcon} />;
  const MenuIconAction = () => <TopNavigationAction icon={MenuIcon} />;

  let accessoryLeft = null;
  switch (mode) {
    case "MENU": {
      accessoryLeft = MenuIconAction;
      break;
    }
    case "BACK": {
      accessoryLeft = BackIconAction;
      break;
    }
  }

  return (
    <StyledTopNavigation
      title={title}
      accessoryLeft={accessoryLeft}
      alignment="center"
    />
  );
}
