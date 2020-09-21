import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from data import Notice
from util import getTypicalNoticeLastid, getInitialListId, saveToJsonFile, loadFromJson, updateLastSavedListId
from util import GeneralClassification, EngineeringClassification, EconomicsClassification, HumanityClassification, NaturalScienceClassification, BusinessClassification, DormitoryClassification, InterChangeClassification
import ssl
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
from exponent_server_sdk import DeviceNotRegisteredError
from exponent_server_sdk import PushClient
from exponent_server_sdk import PushMessage
from exponent_server_sdk import PushResponseError
from exponent_server_sdk import PushServerError
from requests.exceptions import ConnectionError
from requests.exceptions import HTTPError
import attr
import time
import pprint

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


@attr.s(frozen=True)
class FirestoreUpload(object):

    @classmethod
    def uploadSingleNotice(cls, deptCode: str):
        lastListId = getTypicalNoticeLastid(deptCode)
        lastSavedListId = loadFromJson().get(deptCode)
        newLastSavedListId = 0

        for listId in range(lastSavedListId + 1, lastListId + 1):
            documnetPathName = "%s&%s" % (deptCode, str(listId))
            notice_ref = db.collection("notice").document(documnetPathName)
            parsedNotice = Notice.to_dict(deptCode, listId)
            pprint.pprint(parsedNotice)
            newLastSavedListId = listId
            if parsedNotice is not None:
                try:
                    notice_ref.set(parsedNotice)
                    print("firestore upload completed deptCode: " +
                          deptCode + " listId: " + str(listId))
                except Exception as error:
                    updateLastSavedListId(deptCode, newLastSavedListId)
                    print("----------------------------------")
                    print("firestore upload error deptCode: " +
                          deptCode + " listId: " + str(listId))
                    print(error)
                    print("----------------------------------")
        if newLastSavedListId != 0:
            updateLastSavedListId(deptCode, newLastSavedListId)

    @classmethod
    def uploadMultiNotice(cls):
        for deptCode in GeneralClassification:
            cls.uploadSingleNotice(deptCode)
        for deptCode in EngineeringClassification:
            cls.uploadSingleNotice(deptCode)
        for deptCode in EconomicsClassification:
            cls.uploadSingleNotice(deptCode)
        for deptCode in HumanityClassification:
            cls.uploadSingleNotice(deptCode)
        for deptCode in NaturalScienceClassification:
            cls.uploadSingleNotice(deptCode)
        for deptCode in BusinessClassification:
            cls.uploadSingleNotice(deptCode)
        for deptCode in DormitoryClassification:
            cls.uploadSingleNotice(deptCode)
        for deptCode in InterChangeClassification:
            cls.uploadSingleNotice(deptCode)


if __name__ == '__main__':
    while True:
        FirestoreUpload.uploadMultiNotice()
        time.sleep(1)
