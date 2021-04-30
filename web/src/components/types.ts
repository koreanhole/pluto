export interface NoticeCardData {
  department: DepartmentType;
  noticeData: Notice[];
}

export interface DepartmentType {
  id: string;
  deptType: string;
  deptCode: string;
  subDeptCode: string;
  deptClassification: string;
}

interface AttachmentLinksType {
  fileLink: string;
  fileName: string;
}

export interface Notice {
  attachmentLinks: AttachmentLinksType[];
  authorDept: string;
  authorName: string;
  contentHtml: string;
  contentString: string;
  createdDatetime: string;
  department: DepartmentType;
  id: string;
  listId: string;
  title: string;
  url: string;
}
