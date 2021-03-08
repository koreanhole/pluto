import * as React from "react";
import TopAppBar from "~/modules/TopAppBar";

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
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
