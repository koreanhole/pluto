import { Typography } from "@material-ui/core";
import * as React from "react";
import theme from "src/styles/theme";
import styled from "styled-components";
import { Notice } from "./types";
import { isoDateToKorean } from "src/utils/time";

const NoticeViewContainer = styled.div`
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-block-end: 1rem;
  padding: 2rem;
  background-color: ${theme.palette.background.paper};
`;

const SubInfoContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export default function NoticeView({ data }: { data: Notice }) {
  return (
    <>
      <NoticeViewContainer>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          {data.title}
        </Typography>
        <SubInfoContainer>
          <Typography variant="body2">{`${isoDateToKorean(data.createdDatetime)} / ${data.authorName} / ${
            data.authorDept
          } / ${data.department.deptType}`}</Typography>
        </SubInfoContainer>
      </NoticeViewContainer>
      <NoticeViewContainer>
        {data.contentHtml !== "" ? (
          <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
        ) : (
          <Typography variant="body1">공지사항 본문이 없습니다</Typography>
        )}
      </NoticeViewContainer>
    </>
  );
}
