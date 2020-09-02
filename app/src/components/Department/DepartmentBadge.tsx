import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { Text, Alert, View, StyleSheet, Platform } from "react-native";
import { Chip } from "react-native-paper";
import { deleteFromFavoriteDepartmentList } from "./redux/actions";
import { getFavoriteDepartmentList } from "./redux/selectors";
import theme from "theme";
import randomColor from "randomcolor";
import * as Haptics from "expo-haptics";

const DepartmentBadgeContainer = styled.View`
  margin-top: 8px;
  margin-left: 8px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DepartmentBadgeItem = ({
  departmentName,
}: {
  departmentName: string;
}) => {
  const dispatch = useDispatch();
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const handleDeleteFromFavoriteDepartmentList = React.useCallback(() => {
    dispatch(deleteFromFavoriteDepartmentList(departmentName));
    if (Platform.OS == "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }, [favoriteDepartmentList]);

  const handleClickDepartmentBadgeItem = React.useCallback(() => {
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
  }, []);

  return (
    <View style={BadgeButtonStyles.badgeContainer}>
      <Chip
        onPress={handleClickDepartmentBadgeItem}
        onClose={handleClickDepartmentBadgeItem}
        selectedColor={theme.colors.white}
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
        }}
      >
        <Text>{departmentName}</Text>
      </Chip>
    </View>
  );
};

export default function DepartmentBadge() {
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  return (
    <DepartmentBadgeContainer>
      {favoriteDepartmentList !== null ? (
        favoriteDepartmentList.map((departmentName) => {
          return (
            <DepartmentBadgeItem
              key={departmentName}
              departmentName={departmentName}
            />
          );
        })
      ) : (
        <Text>아래 목록에서 선택해주세요</Text>
      )}
    </DepartmentBadgeContainer>
  );
}

const BadgeButtonStyles = StyleSheet.create({
  badgeContainer: {
    marginRight: 8,
    marginBottom: 8,
    color: theme.colors.white,
  },
});
