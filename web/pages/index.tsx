import AppLayout from "src/modules/AppLayout";
import * as React from "react";
import NoticeCard from "src/components/NoticeCard";
import { CircularProgress, Grid } from "@material-ui/core";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_NOTICES,
  NoticesForEveryDepartmentData,
  NoticesForEveryDepartmentVars,
} from "../src/queries/noticeQueries";

const HomeGrid = styled(Grid)`
  padding: 2rem;
  display: inline-block;
  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export default function Home() {
  const { loading, data } = useQuery<NoticesForEveryDepartmentData, NoticesForEveryDepartmentVars>(GET_ALL_NOTICES, {
    variables: { count: 3 },
  });
  return (
    <AppLayout title="UOS공지사항">
      {loading ? (
        <CircularProgress />
      ) : (
        <HomeGrid container direction="row" justify="center">
          {data &&
            data.getNoticesForEveryDepartments.map((item, index) => (
              <Grid key={index}>
                <NoticeCard data={item} />
              </Grid>
            ))}
        </HomeGrid>
      )}
    </AppLayout>
  );
}
