import AppLayout from "~/modules/AppLayout";
import * as React from "react";
import NoticeCard from "~/components/NoticeCard";

export default function Home() {
  return (
    <AppLayout title="sample">
      <NoticeCard />
    </AppLayout>
  );
}
