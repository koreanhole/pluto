import AppLayout from "src/modules/AppLayout";
import * as React from "react";
import { useRouter } from "next/router";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AppLayout title="UOS공지사항">
      <div>{id}</div>
    </AppLayout>
  );
}
