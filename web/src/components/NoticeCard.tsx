import * as React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  makeStyles,
  Typography,
  Box,
} from "@material-ui/core";
import { styled, Theme } from "@material-ui/core/styles";
import { getDescriptiveDateDifference } from "~/utils/time";

const useStyles = makeStyles({
  container: {},
  itemInfoContainer: {
    display: "flex",
    flexDirection: "row",
  },
});

const CardItemInfoContainer = styled("div")({
  display: "flex",
  flexDirection: "row",
});

const CardItemInfoItem = styled(Typography)({
  fontSize: "1rem",
});

const MOCK_ITEM = [
  {
    id: 1,
    title: "test1",
    createdDateTime: "2020-07-21",
  },
  {
    id: 2,
    title: "test2",
    createdDateTime: "2020-07-22",
  },
  {
    id: 3,
    title: "test3",
    createdDateTime: "2020-07-23",
  },
];

function NoticeCardHeader() {
  return <CardHeader avatar={<Avatar aria-label="recipe">컴과</Avatar>} title="컴퓨터과학부" subheader="공과대학" />;
}

function NoticeCardItemList() {
  return (
    <CardContent>
      {MOCK_ITEM.map((item) => (
        <React.Fragment key={item.id}>
          <Typography>{item.title}</Typography>
          <CardItemInfoContainer>
            <CardItemInfoItem>{item.createdDateTime}</CardItemInfoItem>
            <CardItemInfoItem>{item.createdDateTime}</CardItemInfoItem>
          </CardItemInfoContainer>
          <Divider />
        </React.Fragment>
      ))}
    </CardContent>
  );
}

function NoticeCardFooter() {
  return <></>;
}

export default function NoticeCard() {
  return (
    <Card>
      <NoticeCardHeader />
      <NoticeCardItemList />
      <NoticeCardFooter />
    </Card>
  );
}
