import * as React from "react";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function HeaderRightButton() {
  const navigation = useNavigation();

  const handleClickHeaderRightButton = React.useCallback(() => {
    navigation.navigate("Department");
  }, []);
  return (
    <Icon
      name="filter-list"
      type="material"
      onPress={handleClickHeaderRightButton}
    />
  );
}
