import { gql } from "@apollo/client";
import { Notice } from "src/components/types";

export interface NoticesForEveryDepartmentVars {
  count: number;
}
export interface NoticesForEveryDepartmentData {
  getNoticesForEveryDepartments: Notice[][];
}
export const GET_ALL_NOTICES = gql`
  query NoticesForEveryDepartment($count: Float!) {
    getNoticesForEveryDepartments(count: $count) {
      department {
        id
        deptCode
        deptType
        subDeptCode
        deptClassification
      }
      attachmentLinks {
        fileLink
        fileName
      }
      authorDept
      authorName
      contentString
      contentHtml
      createdDatetime
      id
      listId
      title
      url
    }
  }
`;

export interface NoticeByNoticeIdVars {
  id: string | string[];
}
export interface NoticeByNoticeIdData {
  getNoticeByNoticeId: Notice;
}
export const GET_NOTICE_BY_NOTICEID = gql`
  query NoticeByNoticeId($id: String!) {
    getNoticeByNoticeId(id: $id) {
      department {
        id
        deptCode
        deptType
        subDeptCode
        deptClassification
      }
      attachmentLinks {
        fileLink
        fileName
      }
      authorDept
      authorName
      contentString
      contentHtml
      createdDatetime
      id
      listId
      title
      url
    }
  }
`;
