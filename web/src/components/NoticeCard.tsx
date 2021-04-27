import * as React from "react";
import { Avatar, Card, CardContent, CardHeader, Divider, Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { getDescriptiveDateDifference } from "~/utils/time";
import { NoticeCardListData, NoticeCardData } from "./types";
import theme from "~/styles/theme";

const NoticeCardContainer = styled(Card)({
  width: "18rem",
  marginTop: "2rem",
  marginLeft: "2rem",
});

const CardItemInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const CardSubInfoText = styled(Typography)({
  fontSize: "0.75rem",
  color: theme.palette.text.secondary,
});

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
