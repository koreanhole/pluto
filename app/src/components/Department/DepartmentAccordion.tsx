import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Platform, StyleSheet, Text, TextStyle } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Divider from "modules/Divider";
import Ripple from "react-native-material-ripple";
import { addToFavoriteDepartmentList } from "./redux/actions";
import { getFavoriteDepartmentList } from "./redux/selectors";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { showSnackbar } from "modules/Snackbar/redux/actions";
import { DepartmentSection, getDepartmentData } from "util/department";
import { useApolloClient } from "@apollo/client";
import { DepartmentData } from "components/AllArticle/types";
import { ALL_DEPARTMENTS } from "components/AllArticle/queries";

const AccordionHeader = (section: DepartmentSection, _index: number, isActive: boolean) => {
  const headerTextStyles = StyleSheet.flatten([AccordionStyles.text, { fontWeight: "bold" } as TextStyle]);
  return (
    <>
      <View style={AccordionStyles.headerContainer}>
        <Text style={headerTextStyles}>{section.title}</Text>
        {isActive ? (
          <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        )}
      </View>
      <Divider />
    </>
  );
};

const AccordionContent = (section: DepartmentSection) => {
  return (
    <View>
      {section.data.map((departmentName) => {
        return <AccrodionContentItem departmentName={departmentName} key={departmentName} />;
      })}
    </View>
  );
};

const AccrodionContentItem = ({ departmentName }: { departmentName: string }) => {
  const dispatch = useDispatch();

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const handleClickDepartmentName = React.useCallback(() => {
    dispatch(addToFavoriteDepartmentList(departmentName));
    dispatch(
      showSnackbar({
        visible: true,
        message: "새로운 공지사항에 대해 알림을 수신합니다.",
      }),
    );
    if (Platform.OS == "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [favoriteDepartmentList]);
  return (
    <Ripple onPress={handleClickDepartmentName}>
      <View style={AccordionStyles.contentItemContainer}>
        <Text style={AccordionStyles.text}>{departmentName}</Text>
        {favoriteDepartmentList !== null && favoriteDepartmentList.includes(departmentName) ? (
          <MaterialIcons name="check" color={theme.colors.green} size={20} />
        ) : null}
      </View>
    </Ripple>
  );
};

export default function DepartmentAccordion() {
  const client = useApolloClient();

  const [activeDepartmentSection, setActiveDepartmentSection] = React.useState<number[]>([]);
  const [departmentSections, setDepartmentSections] = React.useState<DepartmentSection[]>([]);

  React.useEffect(() => {
    client
      .query<DepartmentData>({
        query: ALL_DEPARTMENTS,
      })
      .then((result) => {
        setDepartmentSections(getDepartmentData(result.data));
      });
  }, []);

  return (
    <Accordion
      sections={departmentSections}
      activeSections={activeDepartmentSection}
      renderHeader={AccordionHeader}
      renderContent={AccordionContent}
      onChange={setActiveDepartmentSection}
      touchableComponent={Ripple}
      underlayColor={theme.colors.white}
    />
  );
}

const AccordionStyles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 15,
  },
  contentItemContainer: {
    flexDirection: "row",
    marginHorizontal: 24,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
