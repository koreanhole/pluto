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
  overflow: hidden;
`;

const InnerHtml = styled.div`
  img {
    display: block;
    height: auto;
    max-width: 100%;
  }
`;

export default function NoticeView({ data }: { data: Notice }) {
  return (
    <>
      <NoticeViewContainer style={{ textAlign: "center" }}>
        <Typography variant="h6">{data.title}</Typography>
        <Typography variant="body2">{`${isoDateToKorean(data.createdDatetime)} / ${data.authorName} / ${
          data.authorDept
        } / ${data.department.deptType}`}</Typography>
      </NoticeViewContainer>
      <NoticeViewContainer>
        {data.contentHtml !== "" ? (
          <InnerHtml dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
        ) : (
          <Typography variant="body1">공지사항 본문이 없습니다</Typography>
        )}
      </NoticeViewContainer>
    </>
  );
}
