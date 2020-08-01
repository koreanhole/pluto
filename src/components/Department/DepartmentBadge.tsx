import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { Text, Alert } from "react-native";
import { Button, Icon } from "react-native-elements";
import { deleteFromFavoriteDepartmentList } from "./redux/actions";
import { getFavoriteDepartmentList } from "./redux/selectors";
import theme from "theme";

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
  const handleClickDepartmentBadgeItem = React.useCallback(() => {
    Alert.alert(`${departmentName}`, "즐겨찾기에서 삭제합니다.", [
      {
        text: "삭제",
        onPress: () =>
          dispatch(deleteFromFavoriteDepartmentList(departmentName)),
        style: "destructive",
      },
      {
        text: "취소",
        style: "cancel",
      },
    ]);
  }, []);

  return (
    <Button
      raised={true}
      title={departmentName}
      onPress={handleClickDepartmentBadgeItem}
      icon={
        <Icon
          name="clear"
          type="material"
          color={theme.colors.white}
          size={15}
        />
      }
      iconRight={true}
      containerStyle={{
        alignSelf: "flex-start",
        marginRight: 8,
        marginBottom: 8,
      }}
      buttonStyle={{ borderRadius: 100 }}
      titleStyle={{ fontSize: 15 }}
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
