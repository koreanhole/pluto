import * as React from "react";
import { Linking } from "react-native";
import { Icon } from "react-native-elements";

export default function HeaderRightButton() {
  const handleClickHeaderRightButton = React.useCallback(() => {
    Linking.openURL("https://naver.com").catch((err) =>
      console.error("Couldn't load page", err)
    );
  }, []);
  return (
    <Icon
      name="public"
      type="material"
      onPress={handleClickHeaderRightButton}
    />
  );
}
