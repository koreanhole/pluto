import * as React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";

export default function HeaderRightButton() {
  const navigation = useNavigation();

  const handleClickHeaderRightButton = React.useCallback(() => {
    navigation.navigate("Department");
  }, [navigation]);
  return (
    <MaterialIcons
      name="format-list-bulleted"
      size={theme.size.headerIconSize}
      onPress={handleClickHeaderRightButton}
      color={theme.colors.black}
      style={{ marginRight: 10 }}
    />
  );
}
