import * as React from "react";
import { Linking } from "react-native";
import { Icon } from "react-native-elements";

export default function HeaderRightButton({ url }: { url?: string }) {
  const handleClickHeaderRightButton = React.useCallback(() => {
    if (typeof url !== "undefined") {
      Linking.openURL(url).catch((err) =>
        console.error("Couldn't load page", err)
      );
    }
  }, [url]);
  return (
    <Icon
      name="public"
      type="material"
      onPress={handleClickHeaderRightButton}
    />
  );
}
