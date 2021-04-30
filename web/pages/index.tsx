import AppLayout from "~/modules/AppLayout";
import * as React from "react";
import NoticeCard from "~/components/NoticeCard";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { MOCK_ITEM } from "~/data/sampleData";

const HomeGridContainer = styled(Grid)`
  padding: 2rem;
`;

export default function Home() {
  return (
    <AppLayout title="UOS공지사항">
      <HomeGridContainer container spacing={4}>
        {MOCK_ITEM.map((data) => (
          <Grid item key={data.department.id}>
            <NoticeCard data={data} />
          </Grid>
        ))}
      </HomeGridContainer>
    </AppLayout>
  );
}
