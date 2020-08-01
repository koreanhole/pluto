import * as React from "react";
import AppLayout from "modules/AppLayout";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import HTML from "react-native-render-html";
import HeaderRightButton from "./HeaderRightButton";
import theme from "theme";

const htmlContent = `
<li id="view_content"><p>  </p><p>2020학년도 여름방학 4차 추가 캠퍼스 안심시대 순찰대 봉사단 선발 명단을 다음과 같이 안내드립니다.   </p><p>  </p><p>가. 2020-여름방학 4차 추가 캠퍼스 안심시대 순찰대 봉사단 선발 결과   </p><p>  - 선발자 명단 : &lt;첨부. 봉사자 명단&gt; 참조   </p><p>   * 선발자 개인별 SMS 통보 예정   </p><p>    </p><p>나. 2020-여름방학 안심시대 순찰대 봉사 안내   </p><p>  * 코로나-19 관련으로 대면식 사전교육은 시행하지 않으니, 본 공지사항 및 첨부 파일을 확인바람   </p><p>  1) 활동목적 : 교내에서 발생하기 쉬운 각종 생활범죄 예방  </p><p>  2) 활동내용 : 평일 저녁시간 순찰 활동 등 치안보조 활동 (교직원 합동 순찰)  </p><p>  3) 활동일시 : &lt;붙임&gt; 명단 개인별 활동일자 반드시 확인    </p><p>  4) 순찰시간 : 평일 20:00 ~ 22:00   </p><p>    * 선발자는 해당 요일 20시까지 대학본부 1층으로 집결   </p><p>  5) 순찰장소 : 캠퍼스 교내  </p><p>  6) 활동복장 : 마스크(개인별 필수 착용), 순찰조끼 및 경광봉 소지(조끼 및 경광봉은 당일 지급)   </p><p>  7) 운영방법   </p><p>    - 본교 교직원 중 참가 희망자와 함께 2개조(조당 5인 이내)로 나누어 활동   </p><p>     ※ 조분류는 근무 당일 임의로 분류함.  </p><p>    - 순찰활동 시간(2시간)은 2020학년도 여름방학 사회봉사Ⅰ․Ⅱ 교과목 관련 봉사활동 시간으로만 인정   </p><p>     ※ 졸업인증이나 기타 봉사 인증용으로는 인정 불가   </p><p>    </p><p>다. 문의사항 : 학생과 사회공헌팀 (담당 : 김병기, 02-6490-6240)   </p><p>  </p><p>  </p></li>
`;

const ArticleContainer = styled.View`
  margin: 16px;
`;

const ArticleAdditionalInformation = styled.Text`
  color: ${theme.colors.darkGrey};
  margin-bottom: 8px;
`;

export default function Article() {
  return (
    <AppLayout
      title="2020-여름방학 캠퍼스 안심시대 순찰대 봉사단(4차-추가) 선발 결과 및 OT 안내"
      mode="BACK"
      rightComponent={<HeaderRightButton />}
    >
      <ScrollView>
        <ArticleContainer>
          <ArticleAdditionalInformation>
            2020-07-20
          </ArticleAdditionalInformation>
          <ArticleAdditionalInformation>
            김병기 / 학생과 / 일반공지
          </ArticleAdditionalInformation>
          <HTML html={htmlContent} />
        </ArticleContainer>
      </ScrollView>
    </AppLayout>
  );
}
