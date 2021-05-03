import * as React from "react";
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { getDescriptiveDateDifference, isoDateToKorean } from "src/utils/time";
import { Notice, NoticeCardData, DepartmentType } from "./types";
import theme from "src/styles/theme";
import styled from "styled-components";
import randomColor from "randomcolor";
import { useRouter } from "next/router";

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

function NoticeCardItem({ data }: { data: Notice }) {
  const router = useRouter();
  const { id, createdDatetime, title, authorName } = data;

  const handleClickListItem = () => {
    router.push(`/articles/${id}`);
  };

  return (
    <CardActionArea onClick={handleClickListItem}>
      <CardHashTagText>{`#${getDescriptiveDateDifference(createdDatetime)}`}</CardHashTagText>
      <Typography>{title}</Typography>
      <CardItemInfoContainer>
        <CardInfoText>{authorName}</CardInfoText>
        <CardInfoText>{isoDateToKorean(createdDatetime)}</CardInfoText>
      </CardItemInfoContainer>
      <Divider />
    </CardActionArea>
  );
}

export default function NoticeCard({ data }: { data: NoticeCardData }) {
  return (
    <NoticeCardContainer>
      <NoticeCardHeader department={data.department} />
      <CardContent>
        {data.noticeData.map((item) => (
          <NoticeCardItem key={item.id} data={item} />
        ))}
      </CardContent>
    </NoticeCardContainer>
  );
}
