import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from data import Notice
from util import getTypicalNoticeLastid, getDeptName
from util import GeneralClassification, EngineeringClassification, EconomicsClassification, HumanityClassification, NaturalScienceClassification
import ssl
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


class FirebaseUpload(object):

    @classmethod
    def uploadSingleNotice(cls, deptCode: str, listId: int):
        notice_ref = db.collection("notice").document(str(listId))

        parsedNotice = Notice.to_dict(deptCode, listId)

        if parsedNotice is not None:
            try:
                notice_ref.set(parsedNotice)
            except:
                print("error")

    @classmethod
    def saveLastVisitedListId(cls, deptCode: str, listId: int):
        saved_list_id_dict = {
            "deptName": getDeptName(deptCode),
            "listId": listId,
        }
        saved_list_id_ref = db.collection("saved_list_id").document(deptCode)
        saved_list_id_ref.set(saved_list_id_dict)

    @classmethod
    def getLastVisitedListId(cls, deptCode: str):
        saved_list_id_ref = db.collection(
            "saved_list_id").document(deptCode)

        return saved_list_id_ref.get().to_dict()

    @classmethod
    def uploadMultiNotice(cls):
        for deptCode in GeneralClassification:
            lastSavedListId = cls.getLastVisitedListId(deptCode)
            lastListId = getTypicalNoticeLastid(deptCode)
            if lastSavedListId is not None:
                lastSavedListId = lastSavedListId.get("listId")
            else:
                lastSavedListId = 0

            for listId in range(lastSavedListId, lastListId):
                print(deptCode, listId)
                cls.uploadSingleNotice(deptCode, listId)


FirebaseUpload.uploadMultiNotice()
