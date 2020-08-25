import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { Text, Alert, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteFromFavoriteDepartmentList } from "./redux/actions";
import { getFavoriteDepartmentList, getExpoPushToken } from "./redux/selectors";
import theme from "theme";
import randomColor from "randomcolor";
import { userDataFirestore } from "util/firebase/firestore";

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
  const expoPushToken = useSelector(getExpoPushToken);
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const handleDeleteFromFavoriteDepartmentList = React.useCallback(() => {
    dispatch(deleteFromFavoriteDepartmentList(departmentName));
    if (typeof expoPushToken !== "undefined" && expoPushToken !== null) {
      userDataFirestore.doc(expoPushToken).update({
        favoriteDepartmentList: favoriteDepartmentList,
        expoPushToken: expoPushToken,
      });
    }
  }, []);

  const handleClickDepartmentBadgeItem = React.useCallback(() => {
    Alert.alert("즐겨찾기에서 삭제하시겠습니까??", departmentName, [
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
    <Button
      raised={true}
      title={departmentName}
      onPress={handleClickDepartmentBadgeItem}
      icon={
        <View style={BadgeButtonStyles.badgeContainer}>
          <MaterialCommunityIcons
            name="bell"
            size={15}
            color={theme.colors.white}
          />
          <MaterialIcons name="clear" color={theme.colors.white} size={15} />
        </View>
      }
      iconRight={true}
      containerStyle={{
        alignSelf: "flex-start",
        marginRight: 8,
        marginBottom: 8,
      }}
      buttonStyle={{
        borderRadius: 100,
        backgroundColor: randomColor({ seed: departmentName }),
      }}
      titleStyle={{ fontSize: 15, fontWeight: "bold" }}
    />
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
    flexDirection: "row",
  },
});
