import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import styled from "styled-components/native";
import { Divider, Icon } from "react-native-elements";
import Ripple from "react-native-material-ripple";
import { addToFavoriteDepartmentList } from "./redux/actions";
import { getFavoriteDepartmentList } from "./redux/selectors";
import theme from "theme";

type AccordionSection = {
  departmentType: string;
  departmentList: string[];
};

type AccordionTextProps = {
  type: "HEADER" | "CONTENT";
};

const ACCORDIONSECTIONS: AccordionSection[] = [
  {
    departmentType: "전체공지",
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
    departmentType: "공과대학",
    departmentList: ["컴퓨터과학부"],
  },
];

const AccordionHeaderContainer = styled.View`
  padding: 10px;
`;

export const AccordionText = styled.Text<AccordionTextProps>`
  padding: 10px 0;
  font-size: 15px;
  ${(props) => (props.type == "HEADER" ? "font-weight: bold" : "")};
`;

const AccordionContentItemContainer = styled.View`
  flex-direction: row;
  margin-horizontal: 24px;
  margin-vertical: 8px;
  justify-content: space-between;
`;

const AccordionHeader = (section: AccordionSection) => {
  return (
    <>
      <AccordionHeaderContainer>
        <AccordionText type="HEADER">{section.departmentType}</AccordionText>
      </AccordionHeaderContainer>
      <Divider style={{ backgroundColor: theme.colors.grey }} />
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

  const favoriteDepartmentList = useSelector(getFavoriteDepartmentList);

  const handleClickDepartmentName = React.useCallback(() => {
    dispatch(addToFavoriteDepartmentList(departmentName));
  }, []);
  return (
    <Ripple onPress={handleClickDepartmentName}>
      <AccordionContentItemContainer>
        <AccordionText type="CONTENT">{departmentName}</AccordionText>
        {favoriteDepartmentList !== null &&
        favoriteDepartmentList.includes(departmentName) ? (
          <Icon name="check" type="material" color={theme.colors.green} />
        ) : null}
      </AccordionContentItemContainer>
    </Ripple>
  );
};

export default function DepartmentAccordion() {
  const [activeDepartmentSection, setActiveDepartmentSection] = React.useState([
    0,
  ]);

  return (
    <Accordion
      sections={ACCORDIONSECTIONS}
      activeSections={activeDepartmentSection}
      renderHeader={AccordionHeader}
      renderContent={AccordionContent}
      onChange={setActiveDepartmentSection}
      touchableComponent={Ripple}
      underlayColor={theme.colors.white}
    />
  );
}
