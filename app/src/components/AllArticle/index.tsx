import * as React from "react";
import { SectionList, Text, StyleSheet, View } from "react-native";
import AppLayout from "modules/AppLayout";
import { useNavigation } from "@react-navigation/native";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import { useApolloClient } from "@apollo/client";
import { DepartmentData } from "./types";
import { ALL_DEPARTMENTS } from "./queries";
import { DepartmentSection } from "components/Department/redux/types";
import _ from "underscore";

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
        <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.darkGrey} />
      </View>
    </Ripple>
  );
};

export default function AllArticle() {
  const navigation = useNavigation();
  const client = useApolloClient();

  const [departmentSections, setDepartmentSections] = React.useState<DepartmentSection[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "전체 부서",
    });
  });

  React.useEffect(() => {
    client
      .query<DepartmentData>({
        query: ALL_DEPARTMENTS,
      })
      .then((result) => {
        const departments: DepartmentSection[] = [];
        result.data.getAllDepartment.forEach((data) => {
          const item = _.findWhere(departmentSections, { title: data.deptClassification });
          if (typeof item !== "undefined") {
            item.data.push(data.deptType);
          } else {
            departments.push({
              title: data.deptClassification,
              data: [data.deptType],
            });
          }
        });
        setDepartmentSections(departments);
      });
  }, []);

  return (
    <AppLayout>
      <View style={AllArticleStyles.container}>
        <SectionList
          sections={departmentSections}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <DepartmentItem item={item} />}
          renderSectionHeader={({ section: { title } }) => <DepartmentSectionHeader title={title} />}
        />
      </View>
    </AppLayout>
  );
}

const AllArticleStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
