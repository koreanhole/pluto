import * as React from "react";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import theme from "theme";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setDialogContent, showDialog } from "modules/Dialog/redux/actions";
import { View, Image, Dimensions } from "react-native";

const dialogContent = (
  <View>
    <Image
      source={require("../../../assets/app_introduce.png")}
      style={{
        width: Dimensions.get("window").width,
        marginVertical: 32,
      }}
    />
  </View>
);

export default function HeaderRightButton() {
  const dispatch = useDispatch();

  const handleClickQuestionClicked = React.useCallback(() => {
    dispatch(showDialog());
    dispatch(setDialogContent(dialogContent));
  }, []);

  return (
    <AntDesign
      name="questioncircleo"
      size={theme.size.headerIconSize}
      style={HeaderRightStyles.icon}
      onPress={handleClickQuestionClicked}
    />
  );
}
