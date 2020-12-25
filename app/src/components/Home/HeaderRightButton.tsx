import * as React from "react";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "theme";
import { useNavigation } from "@react-navigation/native";

export default function HeaderRightButton() {
  const navigation = useNavigation();
  const handleClickDepartmentClicked = React.useCallback(() => {
    navigation.navigate("Department");
  }, []);
  return (
    <MaterialIcons
      name="filter-list"
      size={theme.size.headerIconSize}
      style={HeaderRightStyles.icon}
      onPress={handleClickDepartmentClicked}
    />
  );
}
