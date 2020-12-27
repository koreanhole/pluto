import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Platform } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import styled from "styled-components/native";
import Divider from "modules/Divider";
import Ripple from "react-native-material-ripple";
import { addToFavoriteDepartmentList } from "./redux/actions";
import { getFavoriteDepartmentList } from "./redux/selectors";
import theme from "theme";
import { MaterialIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { showSnackbar } from "modules/Snackbar/redux/actions";

type DepartmentSection = {
  title: string;
  data: string[];
};

type AccordionTextProps = {
  type: "HEADER" | "CONTENT";
};

export const DEPARTMENT_SECTIONS: DepartmentSection[] = [
  {
    title: "전체공지",
    data: [
      "일반공지",
      "학사공지",
      "직원채용",
      "창업공지",
      "입찰공고",
      "시설공사",
    ],
  },
  {
    title: "기타부서",
    data: ["생활관", "국제교육원"],
  },
  {
    title: "공과대학",
    data: [
      "공과대학",
      "전자전기컴퓨터공학부",
      "컴퓨터과학부",
      "화학공학과",
      "기계정보공학과",
      "신소재공학과",
      "토목공학과",
    ],
  },
  {
    title: "경영대학",
    data: ["경영학부"],
  },
  {
    title: "정경대학",
    data: [
      "정경대학",
      "행정학과",
      "국제관계학과",
      "경제학부",
      "사회복지학과",
      "세무학과",
    ],
  },
  {
    title: "인문대학",
    data: [
      "인문대학",
      "영어영문학과",
      "국어국문학과",
      "국사학과",
      "철학과",
      "중국어문화학과",
    ],
  },
  {
    title: "자연과학대학",
    data: [
      "자연과학대학",
      "수학과",
      "통계학과",
      "물리학과",
      "생명과학과",
      "환경원예학과",
    ],
  },
];

const AccordionHeaderContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  align-items: center;
  justify-content: space-between;
`;

const AccordionHeader = (
  section: DepartmentSection,
  _index: number,
  isActive: boolean
) => {
  return (
    <>
      <AccordionHeaderContainer>
        <AccordionText type="HEADER">{section.title}</AccordionText>
        {isActive ? (
          <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        )}
      </AccordionHeaderContainer>
      <Divider style={{ backgroundColor: theme.colors.grey }} />
    </>
  );
};

const AccordionContent = (section: DepartmentSection) => {
  return (
    <View>
      {section.data.map((departmentName) => {
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
    dispatch(
      showSnackbar({
        visible: true,
        message: "새로운 공지사항에 대해 알림을 수신합니다.",
      })
    );
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
            <MaterialIcons name="check" color={theme.colors.green} size={20} />
          ) : null}
      </AccordionContentItemContainer>
    </Ripple>
  );
};

export default function DepartmentAccordion() {
  const [activeDepartmentSection, setActiveDepartmentSection] = React.useState<
    number[]
  >([]);

  return (
    <Accordion
      sections={DEPARTMENT_SECTIONS}
      activeSections={activeDepartmentSection}
      renderHeader={AccordionHeader}
      renderContent={AccordionContent}
      onChange={setActiveDepartmentSection}
      touchableComponent={Ripple}
      underlayColor={theme.colors.white}
    />
  );
}
