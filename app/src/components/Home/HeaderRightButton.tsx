import * as React from "react";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import theme from "theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function HeaderRightButton() {
  const navigation = useNavigation();

  const handleClickSearch = React.useCallback(() => {
    navigation.navigate("Search");
  }, [navigation]);

  const handleClickDepartment = React.useCallback(() => {
    navigation.navigate("Department");
  }, [navigation]);

  return (
    <View style={HeaderRightStyles.container}>
      <Ionicons
        name="ios-search"
        size={theme.size.headerIconSize}
        style={HeaderRightStyles.icon}
        onPress={handleClickSearch}
      />
      <MaterialIcons
        name="settings"
        size={theme.size.headerIconSize}
        style={HeaderRightStyles.icon}
        onPress={handleClickDepartment}
      />
    </View>
  );
}
