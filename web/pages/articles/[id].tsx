import AppLayout from "src/modules/AppLayout";
import * as React from "react";
import { useRouter } from "next/router";
import NoticeView from "src/components/NoticeView";
import { useQuery } from "@apollo/client";
import { NoticeByNoticeIdData, NoticeByNoticeIdVars, GET_NOTICE_BY_NOTICEID } from "../../src/queries/noticeQueries";

export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, data } = useQuery<NoticeByNoticeIdData, NoticeByNoticeIdVars>(GET_NOTICE_BY_NOTICEID, {
    variables: { id },
  });
  if (loading) return null;
  if (data) {
    return (
      <AppLayout
        title="UOS공지사항"
        attachmentLinks={data.getNoticeByNoticeId.attachmentLinks}
        noticeUrl={data.getNoticeByNoticeId.url}>
        <NoticeView data={data.getNoticeByNoticeId} />
      </AppLayout>
    );
  }
}
