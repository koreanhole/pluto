import * as React from "react";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import theme from "theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HeaderRightButton() {
  const navigation = useNavigation();
  const handleClickDepartmentClicked = React.useCallback(() => {
    navigation.navigate("Department");
  }, []);
  return (
    <MaterialCommunityIcons
      name="format-list-bulleted"
      size={theme.size.headerIconSize}
      style={HeaderRightStyles.icon}
      onPress={handleClickDepartmentClicked}
    />
  );
}
