import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import theme from "theme";
import { HeaderRightStyles } from "modules/headerRightButton/base";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { getFavoriteDepartmentList } from "../Department/redux/selectors";
import { searchNoticeAsync } from "./redux/actions";
import { getSearchedArticle } from "./redux/selectors";

export default function Search() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const searchResult = useSelector(getSearchedArticle);

  const onChangeSearch = React.useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleClearSearchQuery = React.useCallback(() => setSearchQuery(""), []);

  const handleDestroySearchScreen = React.useCallback(() => navigation.goBack(), []);

  const handleSubmitSearchQuery = React.useCallback(
    ({ nativeEvent: { text } }) => {
      dispatch(
        searchNoticeAsync.request({
          departmentList: favoriteDepartmentList,
          query: text,
          pageType: "HOME",
        }),
      );
    },
    [searchResult],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <AppLayout>
      <SafeAreaView>
        <View style={SearchBarStyles.container}>
          <Ionicons name="ios-search" size={theme.size.headerIconSize} style={HeaderRightStyles.icon} />
          <TextInput
            placeholder="검색어를 입력해주세요."
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={SearchBarStyles.textInput}
            returnKeyType="search"
            autoCompleteType="off"
            autoCorrect={false}
            onSubmitEditing={handleSubmitSearchQuery}
          />
          {searchQuery !== "" && (
            <MaterialIcons
              name="close"
              size={theme.size.headerIconSize}
              style={HeaderRightStyles.icon}
              onPress={handleClearSearchQuery}
            />
          )}
          <Text onPress={handleDestroySearchScreen} style={SearchBarStyles.destroyButton}>
            취소
          </Text>
        </View>
        <Text>검색창</Text>
      </SafeAreaView>
    </AppLayout>
  );
}

const SearchBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  textInput: {
    height: 48,
    flex: 2,
    fontSize: 16,
  },
  destroyButton: {
    fontSize: 16,
  },
});
