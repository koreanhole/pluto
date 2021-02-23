import { gql } from "@apollo/client";

export const GET_NOTICE_BY_NOTICE_ID = gql`
  query getNoticeByNoticeId($id: String!) {
    getNotice(id: $id) {
      attachmentLinks {
        fileLink
        fileName
      }
      authorDept
      authorName
      contentHtml
      contentString
      createdDatetime
      department {
        deptCode
        deptType
      }
      id
      listId
      url
    }
  }
`;
