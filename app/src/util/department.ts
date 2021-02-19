import _ from "underscore";
import { DepartmentData } from "../components/AllArticle/types";

export type DepartmentSection = {
  title: string;
  data: string[];
};

export function getDepartmentData(departments: DepartmentData) {
  const result: DepartmentSection[] = [];
  departments.getAllDepartment.forEach((data) => {
    const item = _.findWhere(result, { title: data.deptClassification });
    if (typeof item !== "undefined") {
      item.data.push(data.deptType);
    } else {
      result.push({
        title: data.deptClassification,
        data: [data.deptType],
      });
    }
  });
  return result;
}
