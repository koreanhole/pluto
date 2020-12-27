import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, Alert, View, StyleSheet, Platform } from "react-native";
import { Chip } from "react-native-paper";
import { deleteFromFavoriteDepartmentList } from "./redux/actions";
import { getFavoriteDepartmentList } from "./redux/selectors";
import theme from "theme";
import randomColor from "randomcolor";
import * as Haptics from "expo-haptics";

const DepartmentBadgeItem = ({ departmentName }: { departmentName: string }) => {
  const dispatch = useDispatch();
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const handleDeleteFromFavoriteDepartmentList = React.useCallback(() => {
    dispatch(deleteFromFavoriteDepartmentList(departmentName));
    if (Platform.OS == "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [favoriteDepartmentList]);

  const handleClickDepartmentBadgeItem = React.useCallback(() => {
    if (favoriteDepartmentList.length == 1) {
      Alert.alert("즐겨찾기에서 삭제할 수 없습니다.", departmentName, [
        {
          text: "확인",
          style: "default",
        },
      ]);
    } else {
      Alert.alert("즐겨찾기에서 삭제하시겠습니까?", departmentName, [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "확인",
          onPress: handleDeleteFromFavoriteDepartmentList,
          style: "default",
        },
      ]);
    }
  }, []);

  return (
    <View style={BadgeStyles.buttonContainer}>
      <Chip
        onPress={handleClickDepartmentBadgeItem}
        onClose={handleClickDepartmentBadgeItem}
        selectedColor={theme.colors.white}
        accessibilityComponentType="button"
        accessibilityTraits="button"
        icon="bell"
        textStyle={{
          color: theme.colors.white,
          fontSize: 15,
          fontWeight: "bold",
        }}
        style={{
          backgroundColor: randomColor({
            seed: departmentName,
            luminosity: "bright",
            alpha: 1,
          }),
        }}>
        <Text>{departmentName}</Text>
      </Chip>
    </View>
  );
};

export default function DepartmentBadge() {
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  return (
    <View style={BadgeStyles.container}>
      {favoriteDepartmentList !== null ? (
        favoriteDepartmentList.map((departmentName) => {
          return <DepartmentBadgeItem key={departmentName} departmentName={departmentName} />;
        })
      ) : (
        <Text>아래 목록에서 선택해주세요</Text>
      )}
    </View>
  );
}

const BadgeStyles = StyleSheet.create({
  container: {
    marginTop: 8,
    marginLeft: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    marginRight: 8,
    marginBottom: 8,
    color: theme.colors.white,
  },
});
