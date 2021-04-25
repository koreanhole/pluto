import * as React from "react";
import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { getDescriptiveDateDifference } from "~/utils/time";
import { NoticeCardListData, NoticeCardData } from "./types";

const NoticeCardContainer = styled(Card)({
  maxWidth: "18rem",
  marginTop: "2rem",
  marginLeft: "2rem",
});

const CardItemInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const CardItemInfoItem = styled(Typography)({
  fontSize: "1rem",
});

function NoticeCardHeader({ department }: { department: string }) {
  return <CardHeader avatar={<Avatar aria-label="recipe">컴과</Avatar>} title={department} subheader="공과대학" />;
}

function NoticeCardItemList({ data }: { data: NoticeCardListData[] }) {
  return (
    <CardContent>
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <Typography>{`#${getDescriptiveDateDifference(item.createdDateTime)}`}</Typography>
          <Typography>{item.title}</Typography>
          <CardItemInfoContainer>
            <CardItemInfoItem>{item.author}</CardItemInfoItem>
            <CardItemInfoItem>{item.createdDateTime}</CardItemInfoItem>
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
