import * as React from "react";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import theme from "theme";
import { AntDesign } from "@expo/vector-icons";

export default function HeaderRightButton() {
  const handleClickQuestionClicked = React.useCallback(() => {}, []);
  return (
    <AntDesign
      name="questioncircleo"
      size={theme.size.headerIconSize}
      style={HeaderRightStyles.icon}
      onPress={handleClickQuestionClicked}
    />
  );
}
