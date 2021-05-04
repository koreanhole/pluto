import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useRouter } from "next/router";

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AppBarHomeText = styled.div`
  cursor: pointer;
`;

function TopAppBar({ title }: { title: string }) {
  const router = useRouter();

  const handleClickHome = () => {
    router.push("/");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <AppBarHomeText onClick={handleClickHome}>
          <Typography variant="h6">{title}</Typography>
        </AppBarHomeText>
      </Toolbar>
    </AppBar>
  );
}

export default function AppLayout(props: AppLayoutProps) {
  const { title, children } = props;
  return (
    <>
      <TopAppBar title={title} />
      {children}
    </>
  );
}
