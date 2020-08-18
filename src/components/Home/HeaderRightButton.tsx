import * as React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";

export default function HeaderRightButton() {
  const navigation = useNavigation();

  const handleClickHeaderRightButton = React.useCallback(() => {
    navigation.navigate("Department");
  }, [navigation]);
  return (
    <Icon
      name="format-list-bulleted"
      type="material"
      onPress={handleClickHeaderRightButton}
      color={theme.colors.black}
      style={{ marginRight: 10 }}
    />
  );
}
