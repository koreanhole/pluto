import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Platform } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import styled from "styled-components/native";
import { Divider } from "react-native-paper";
import Ripple from "react-native-material-ripple";
import { addToFavoriteDepartmentList, setShowSnackBar } from "./redux/actions";
import { getFavoriteDepartmentList } from "./redux/selectors";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

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
    ],
  },
  {
    departmentType: "공과대학",
    departmentList: [
      "전자전기컴퓨터공학부",
      "컴퓨터과학부",
      "화학공학과",
      "기계정보공학과",
      "신소재공학과",
      "토목공학과",
    ],
  },
  {
    departmentType: "경영대학",
    departmentList: ["경영학부"],
  },
  {
    departmentType: "정경대학",
    departmentList: [
      "행정학과",
      "국제관계학과",
      "경제학부",
      "사회복지학과",
      "세무학과",
    ],
  },
  {
    departmentType: "인문대학",
    departmentList: [
      "영어영문학과",
      "국어국문학과",
      "국사학과",
      "철학과",
      "중국어문화학과",
    ],
  },
  {
    departmentType: "자연과학대학",
    departmentList: [
      "수학과",
      "통계학과",
      "물리학과",
      "생명과학과",
      "환경원예학과",
    ],
  },
  {
    departmentType: "그 밖의 부서",
    departmentList: ["생활관"],
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
    dispatch(setShowSnackBar(true));
    if (Platform.OS == "ios") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [favoriteDepartmentList]);
  return (
    <Ripple onPress={handleClickDepartmentName}>
      <AccordionContentItemContainer>
        <AccordionText type="CONTENT">{departmentName}</AccordionText>
        {favoriteDepartmentList !== null &&
        favoriteDepartmentList.includes(departmentName) ? (
          <MaterialIcons
            name="check"
            color={theme.colors.green}
            size={theme.size.headerIconSize}
          />
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
