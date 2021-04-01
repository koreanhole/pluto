import * as React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

interface TopAppBarProps {
  title: string;
}

export default function TopAppBar(props: TopAppBarProps) {
  const { title } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}
