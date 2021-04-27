import AppLayout from "~/modules/AppLayout";
import * as React from "react";
import NoticeCard from "~/components/NoticeCard";
import { NoticeCardData } from "~/components/types";
import { Grid } from "@material-ui/core";

const MOCK_ITEM: NoticeCardData = {
  department: "컴퓨터과학부",
  noticaCardListData: [
    {
      id: 1,
      title: "test1",
      author: "누굴까",
      createdDateTime: "2020-07-21",
    },
    {
      id: 2,
      title: "test2",
      author: "누굴까",
      createdDateTime: "2020-07-22",
    },
    {
      id: 3,
      title: "test3",
      author: "누굴까",
      createdDateTime: "2020-07-23",
    },
  ],
};

export default function Home() {
  return (
    <AppLayout title="UOS공지사항">
      <Grid container>
        <Grid item>
          <NoticeCard department={MOCK_ITEM.department} noticaCardListData={MOCK_ITEM.noticaCardListData} />
        </Grid>
        <Grid item>
          <NoticeCard department={MOCK_ITEM.department} noticaCardListData={MOCK_ITEM.noticaCardListData} />
        </Grid>
        <Grid item>
          <NoticeCard department={MOCK_ITEM.department} noticaCardListData={MOCK_ITEM.noticaCardListData} />
        </Grid>
        <Grid item>
          <NoticeCard department={MOCK_ITEM.department} noticaCardListData={MOCK_ITEM.noticaCardListData} />
        </Grid>
        <Grid item>
          <NoticeCard department={MOCK_ITEM.department} noticaCardListData={MOCK_ITEM.noticaCardListData} />
        </Grid>
        <Grid item>
          <NoticeCard department={MOCK_ITEM.department} noticaCardListData={MOCK_ITEM.noticaCardListData} />
        </Grid>
        <Grid item>
          <NoticeCard department={MOCK_ITEM.department} noticaCardListData={MOCK_ITEM.noticaCardListData} />
        </Grid>
      </Grid>
    </AppLayout>
  );
}
