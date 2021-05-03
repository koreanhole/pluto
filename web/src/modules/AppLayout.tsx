import * as React from "react";
import { AppBar, createStyles, Divider, Drawer, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 500,
      flexShrink: 0,
    },
  }),
);

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
  const styles = useStyles();
  const { title, children } = props;
  return (
    <>
      <TopAppBar title={title} />
      <Drawer open={true} variant="persistent" anchor="left" className={styles.drawer}>
        <div>학과이름들 자리</div>
        <Divider />
      </Drawer>
      {children}
    </>
  );
}
