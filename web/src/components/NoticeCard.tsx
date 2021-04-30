import * as React from "react";
import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { getDescriptiveDateDifference } from "~/utils/time";
import { NoticeCardListData, NoticeCardData } from "./types";
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

function NoticeCardItemList({ data }: { data: NoticeCardListData[] }) {
  return (
    <CardContent>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <CardSubInfoText>{`#${getDescriptiveDateDifference(item.createdDateTime)}`}</CardSubInfoText>
          <Typography>{item.title}</Typography>
          <CardItemInfoContainer>
            <CardSubInfoText>{item.author}</CardSubInfoText>
            <CardSubInfoText>{item.createdDateTime}</CardSubInfoText>
          </CardItemInfoContainer>
          <Divider />
        </React.Fragment>
      ))}
    </CardContent>
  );
}

export default function NoticeCard(data: NoticeCardData) {
  const { department, noticaCardListData } = data;
  return (
    <NoticeCardContainer>
      <NoticeCardHeader department={department} />
      <NoticeCardItemList data={noticaCardListData} />
    </NoticeCardContainer>
  );
}
