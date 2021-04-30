import * as React from "react";
import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { getDescriptiveDateDifference } from "~/utils/time";
import { Notice, NoticeCardData } from "./types";
import theme from "~/styles/theme";
import styled from "styled-components";

const NoticeCardContainer = styled(Card)`
  width: 18rem;
  margin-bottom: 2rem;
`;

const CardItemInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardSubInfoText = styled(Typography)`
  font-size: "0.75rem";
  color: ${theme.palette.text.primary};
`;

function NoticeCardHeader({ department }: { department: string }) {
  return <CardHeader avatar={<Avatar aria-label="recipe">컴과</Avatar>} title={department} subheader="공과대학" />;
}

function NoticeCardItemList({ data }: { data: Notice[] }) {
  return (
    <CardContent>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <CardSubInfoText>{`#${getDescriptiveDateDifference(item.createdDatetime)}`}</CardSubInfoText>
          <Typography>{item.title}</Typography>
          <CardItemInfoContainer>
            <CardSubInfoText>{item.authorName}</CardSubInfoText>
            <CardSubInfoText>{item.title}</CardSubInfoText>
          </CardItemInfoContainer>
          <Divider />
        </React.Fragment>
      ))}
    </CardContent>
  );
}

export default function NoticeCard({ data }: { data: NoticeCardData }) {
  return (
    <NoticeCardContainer>
      <NoticeCardHeader department={data.department.deptType} />
      <NoticeCardItemList data={data.noticeData} />
    </NoticeCardContainer>
  );
}
