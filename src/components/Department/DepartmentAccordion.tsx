import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import styled from "styled-components/native";
import { Divider } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import { addToFavoriteDepartmentList } from "./redux/actions";
import { getFavoriteDepartmentList } from "./redux/selectors";

type AccordionSection = {
  departmentType: string;
  departmentList: string[];
};

const ACCORDIONSECTIONS: AccordionSection[] = [
  {
    departmentType: "전체",
    departmentList: [
      "일반공지",
      "학사공지",
      "직원채용",
      "창업공지",
      "입찰공고",
      "시설공사",
      "행사안내",
      "비교과교육",
    ],
  },
  {
    departmentType: "Second",
    departmentList: ["Second content"],
  },
];

const AccordionHeaderContainer = styled.View``;

const AccordionText = styled.Text`
  padding: 10px 0;
  font-size: 15px;
`;

const AccordionContentItemContainer = styled.View`
  margin-left: 24px;
`;

const AccordionHeader = (section: AccordionSection) => {
  return (
    <>
      <AccordionHeaderContainer>
        <AccordionText>{section.departmentType}</AccordionText>
      </AccordionHeaderContainer>
      <Divider style={{ backgroundColor: "#f2f2f2" }} />
    </>
  );
};

const AccordionContent = (section: AccordionSection) => {
  return (
    <View>
      {section.departmentList.map((departmentName) => {
        return (
          <AccrodionContentItem
            departmentName={departmentName}
            key={departmentName}
          />
        );
      })}
    </View>
  );
};

const AccrodionContentItem = ({
  departmentName,
}: {
  departmentName: string;
}) => {
  const dispatch = useDispatch();
  const handleClickDepartmentName = React.useCallback(() => {
    dispatch(addToFavoriteDepartmentList(departmentName));
  }, []);
  return (
    <Ripple onPress={handleClickDepartmentName}>
      <AccordionContentItemContainer>
        <AccordionText>{departmentName}</AccordionText>
      </AccordionContentItemContainer>
    </Ripple>
  );
};

export default function DepartmentAccordion() {
  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);
  const [activeDepartmentSection, setActiveDepartmentSection] = React.useState([
    0,
  ]);

  return (
    <>
      <Text>{favoriteDepartmentList}</Text>
      <Accordion
        sections={ACCORDIONSECTIONS}
        activeSections={activeDepartmentSection}
        renderHeader={AccordionHeader}
        renderContent={AccordionContent}
        onChange={setActiveDepartmentSection}
        touchableComponent={Ripple}
        expandMultiple={true}
        underlayColor="#fff"
      />
    </>
  );
}
