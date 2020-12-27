import { NoticeArticle } from "components/Article/redux/types";
import { firebase } from "util/firebase/config";
import { UploadUserDepartmentListRequestPayload } from "components/Department/redux/types";

export const noticeFirestore = firebase.firestore().collection("notice");
export const userDataFirestore = firebase.firestore().collection("userData");
export const getNoticeDocumentId = (deptCode: string, listId: string) => {
  return `${deptCode}&${listId}`;
};

export const loadInitialNoticeList = async (departmentList: string[]) => {
  const query = noticeFirestore
    .where("deptName", "in", departmentList)
    .orderBy("createdDateTimestamp", "desc")
    .limit(50);
  const initialNoticeList = await query
    .get()
    .then((documentSnapshots) => {
      const fetchedNoticeData: NoticeArticle[] = documentSnapshots.docs.map((document) => {
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
      });
      return fetchedNoticeData;
    })
    .catch(() => {
      return null;
    });
  return initialNoticeList;
};

export const loadNoticeData = async ({ deptCode, listId }: { deptCode: string; listId: string }) => {
  const noticeDocumentId = getNoticeDocumentId(deptCode, listId);
  const noticeRef = noticeFirestore.doc(noticeDocumentId);

  const noticeData = await noticeRef
    .get()
    .then((document) => {
      const fetchedData = document.data();
      if (document.exists && typeof fetchedData !== "undefined") {
        const fetchedNoticeData: NoticeArticle = {
          attachmentLink: fetchedData.attachmentLink,
          authorDept: fetchedData.authorDept,
          authorName: fetchedData.authorName,
          contentHtml: fetchedData.contentHtml,
          createdDate: fetchedData.createdDate,
          title: fetchedData.title,
          contentString: fetchedData.contentString,
          listId: fetchedData.listId,
          deptName: fetchedData.deptName,
          deptCode: fetchedData.deptCode,
          url: fetchedData.url,
        };
        return fetchedNoticeData;
      }
      return null;
    })
    .catch(() => {
      return null;
    });
  return noticeData;
};

export async function updateUserFavoriteDepartmentList(userData: UploadUserDepartmentListRequestPayload) {
  const { expoPushToken, favoriteDepartmentList } = userData;
  await userDataFirestore.doc(expoPushToken).set({
    favoriteDepartmentList: favoriteDepartmentList,
    expoPushToken: expoPushToken,
  });
}
