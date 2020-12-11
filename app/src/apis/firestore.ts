import { NoticeArticle } from "components/Article/redux/types";
import { firebase } from "util/firebase/config";

export const noticeFirestore = firebase.firestore().collection("notice");
export const userDataFirestore = firebase.firestore().collection("userData");
export const getNoticeDocumentId = (deptCode: string, listId: string) => {
  return `${deptCode}&${listId}`;
};

export const loadInitialNotice = async (departmentList: string[]) => {
  const query = noticeFirestore
    .where("deptName", "in", departmentList)
    .orderBy("createdDate", "desc")
    .limit(50);
  const fetchedData = await query
    .get()
    .then((documentSnapshots) => {
      const fetchedNoticeData: NoticeArticle[] = documentSnapshots.docs.map(
        (document) => {
          const fetchedData = document.data();
          return {
            createdDateTimestamp: fetchedData.createdDateTimestamp,
            deptCode: fetchedData.deptCode,
            deptName: fetchedData.deptName,
            authorDept: fetchedData.authorDept,
            title: fetchedData.title,
            createdDate: fetchedData.createdDate,
            authorName: fetchedData.authorName,
            listId: fetchedData.listId,
            favoriteCount: fetchedData.favoriteCount,
          };
        }
      );
      return fetchedNoticeData;
    })
    .catch(() => {
      return null;
    });
  return fetchedData;
};
