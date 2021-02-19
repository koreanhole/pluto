import { gql } from "@apollo/client";

export const ALL_DEPARTMENTS = gql`
  query AllDepartments {
    getAllDepartment {
      id
      deptClassification
      deptCode
      deptType
    }
  }
`;
