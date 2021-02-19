import { gql } from "@apollo/client";

export const ALL_DEPARTMENTS = gql`
  query allDepartments {
    getAllDepartment {
      id
      deptClassification
      deptCode
      deptType
    }
  }
`;

export const NOTICE_BY_DEPARTMENT_NAME = gql`
  query noticeByDepartmentName($deptName: String!, $offset: Float!) {
    getNoticeByDepartmentName(deptName: $deptName, offset: $offset) {
      department {
        deptCode
        deptType
      }
      authorDept
      title
      createdDatetime
      authorName
      listId
    }
  }
`;
