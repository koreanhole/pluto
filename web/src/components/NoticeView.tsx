import { Typography } from "@material-ui/core";
import * as React from "react";
import theme from "src/styles/theme";
import styled from "styled-components";
import { Notice } from "./types";

const NoticeViewContainer = styled.div`
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  background-color: ${theme.palette.background.paper};
`;

export default function NoticeView({ data }: { data: Notice }) {
  return (
    <NoticeViewContainer>
      <Typography>{data.title}</Typography>
      <Typography>{data.createdDatetime}</Typography>
      <Typography>{data.authorName}</Typography>
      <Typography>{data.authorDept}</Typography>
      <div dangerouslySetInnerHTML={{ __html: data.contentHtml }} />
    </NoticeViewContainer>
  );
}
