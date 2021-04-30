import * as React from "react";
import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { getDescriptiveDateDifference, isoDateToKorean } from "~/utils/time";
import { Notice, NoticeCardData, DepartmentType } from "./types";
import theme from "~/styles/theme";
import styled from "styled-components";
import randomColor from "randomcolor";

const NoticeCardContainer = styled(Card)`
  width: 18rem;
`;

const CardItemInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CardHashTagText = styled.p`
  font-size: 0.875rem;
  margin-bottom: 1rem;
  color: ${theme.palette.grey[800]};
`;
const CardInfoText = styled.p`
  font-size: 0.875rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

function NoticeCardHeader({ department }: { department: DepartmentType }) {
  const { deptType, deptClassification } = department;
  return (
    <CardHeader
      avatar={
        <Avatar
          style={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            backgroundColor: randomColor({
              seed: deptType,
              luminosity: "bright",
              alpha: 1,
            }),
          }}>
          {deptType[0]}
        </Avatar>
      }
      title={deptType}
      subheader={deptClassification}
    />
  );
}

function NoticeCardItemList({ data }: { data: Notice[] }) {
  return (
    <CardContent>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <CardHashTagText>{`#${getDescriptiveDateDifference(item.createdDatetime)}`}</CardHashTagText>
          <Typography>{item.title}</Typography>
          <CardItemInfoContainer>
            <CardInfoText>{item.authorName}</CardInfoText>
            <CardInfoText>{isoDateToKorean(item.createdDatetime)}</CardInfoText>
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
      <NoticeCardHeader department={data.department} />
      <NoticeCardItemList data={data.noticeData} />
    </NoticeCardContainer>
  );
}
