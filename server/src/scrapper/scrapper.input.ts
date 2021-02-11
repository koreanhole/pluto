export class GetDepartmentLastListIdInput {
  deptCode: string;
  subDeptCode: string;
  deptType: string;
}

export class GetNoticeDataInput {
  listId: string;
  deptCode: string;
  subDeptCode?: string;
  departmentId: string;
}
