export class GetRecentListIdsInput {
  deptCode: string;
  subDeptCode: string;
  deptType: string;
  lastFetchedListId: string;
}

export class GetNoticeDataInput {
  listId: string;
  deptCode: string;
  subDeptCode?: string;
  departmentId: string;
}
