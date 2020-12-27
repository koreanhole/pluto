import * as React from "react";
import { SectionList, Text, StyleSheet, View } from "react-native";
import AppLayout from "modules/AppLayout";
import { HomeContainer } from "components/Home/index";
import { useNavigation } from "@react-navigation/native";
import { DEPARTMENT_SECTIONS } from "components/Department/DepartmentAccordion";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";

const DepartmentSectionHeader = ({ title }: { title: string }) => {
  return (
    <View style={AllArticleStyles.sectionHeaderContainer}>
      <Text style={AllArticleStyles.sectionHeaderTextStyle}>{title}</Text>
    </View>
  );
};

const DepartmentItem = ({ item }: { item: string }) => {
  const navigation = useNavigation();
  const handleClickDepartmentItem = React.useCallback(() => {
    navigation.navigate("ArticleList", { deptName: item });
  }, [item]);
  return (
    <Ripple onPress={handleClickDepartmentItem}>
      <View style={AllArticleStyles.sectionItemContainerStyle}>
        <Text style={AllArticleStyles.sectionItemTextStyles}>{item}</Text>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={24}
          color={theme.colors.darkGrey}
        />
      </View>
    </Ripple>
  );
};

export default function AllArticle() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "전체 부서",
    });
  });

  return (
    <AppLayout>
      <HomeContainer>
        <SectionList
          sections={DEPARTMENT_SECTIONS}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <DepartmentItem item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <DepartmentSectionHeader title={title} />
          )}
        />
      </HomeContainer>
    </AppLayout>
  );
}

const AllArticleStyles = StyleSheet.create({
  sectionHeaderContainer: {
    paddingLeft: 16,
    paddingVertical: 8,
    backgroundColor: theme.colors.ligthGrey,
  },
  sectionHeaderTextStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionItemContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  sectionItemTextStyles: {
    fontSize: 16,
  },
});
