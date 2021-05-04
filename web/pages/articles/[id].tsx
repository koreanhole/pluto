import AppLayout from "src/modules/AppLayout";
import * as React from "react";
import { useRouter } from "next/router";
import { MOCK_ITEM } from "src/data/sampleData";
import NoticeView from "src/components/NoticeView";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <AppLayout title="UOS공지사항" attachmentLinks={MOCK_ITEM[0].noticeData[0].attachmentLinks}>
      <NoticeView data={MOCK_ITEM[0].noticeData[0]} />
    </AppLayout>
  );
}
