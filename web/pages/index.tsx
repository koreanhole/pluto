import AppLayout from "src/modules/AppLayout";
import * as React from "react";
import NoticeCard from "src/components/NoticeCard";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { MOCK_ITEM } from "src/data/sampleData";

const HomeGrid = styled(Grid)`
  padding: 2rem;
  display: inline-block;
  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export default function Home() {
  return (
    <AppLayout title="UOS공지사항">
      <HomeGrid container>
        {MOCK_ITEM.map((data) => (
          <Grid item key={data.department.id}>
            <NoticeCard data={data} />
          </Grid>
        ))}
      </HomeGrid>
    </AppLayout>
  );
}
