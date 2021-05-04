import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

function TopAppBar({ title }: { title: string }) {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
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
