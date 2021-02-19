type Department = {
  id: string;
  deptCode: string;
  deptType: string;
  deptClassification: string;
};

export type DepartmentData = {
  getAllDepartment: Department[];
};
