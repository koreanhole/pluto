import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from data import Notice
from util import getTypicalNoticeLastid, getInitialListId
from util import GeneralClassification, EngineeringClassification, EconomicsClassification, HumanityClassification, NaturalScienceClassification
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
from multiprocessing import Process

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()


class FirestoreUpload(object):

    @classmethod
    def uploadSingleNotice(cls, deptCode: str):

        lastSavedListId = cls.getLastVisitedListId(deptCode)
        lastListId = getTypicalNoticeLastid(deptCode)
        if lastSavedListId is not None:
            lastSavedListId = lastSavedListId.get("listId")
        else:
            lastSavedListId = getInitialListId(deptCode)

        for listId in range(lastSavedListId, lastListId + 1):
            documnetPathName = "%s/%s" % (deptCode, str(listId))
            notice_ref = db.collection("notice").document(documnetPathName)
            parsedNotice = Notice.to_dict(deptCode, listId)
            if parsedNotice is not None:
                try:
                    notice_ref.set(parsedNotice)
                    print("firestore upload completed deptCode: " +
                          deptCode + " listId: " + listId)
                except:
                    print("firestore upload error deptCode: " +
                          deptCode + " listId: " + listId)
            newLastSavedListId = listId
        cls.saveLastVisitedListId(deptCode, newLastSavedListId)

    @classmethod
    def saveLastVisitedListId(cls, deptCode: str, listId: int):
        saved_list_id_dict = {
            "deptName": deptCode,
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
    def getPushTokenByDepartment(cls, deptName: str):
        userList = []
        docs = db.collection("userData").where(
            "favoriteDepartmentList", "array_contains", deptName).stream()
        for doc in docs:
            userList.append(doc.id)
        return userList

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


@attr.s(frozen=True)
class FirestoreListener(object):
    initialState: bool = attr.ib()

    @classmethod
    def on_snapshot(cls, col_snapshot, changes, read_time):
        if not cls.initialState:
            for change in changes:
                addedDocument = change.document.to_dict()
                if change.type.name == 'ADDED':
                    deptName = addedDocument.get("deptName")
                    title = addedDocument.get("title")
                    listId = change.document.id
                    pushTokenList = FirestoreUpload.getPushTokenByDepartment(
                        deptName=deptName)
                    for token in pushTokenList:
                        ExpoPushNotification.send_push_message(
                            token=token, title=deptName, message=title)
        else:
            cls.initialState = False

    @classmethod
    def getAddedNotice(cls):
        cls.initialState = True
        col_query = db.collection(u'notice')
        query_watch = col_query.on_snapshot(cls.on_snapshot)
        while True:
            time.sleep(1)


class ExpoPushNotification(object):
    @ classmethod
    def send_push_message(cls, token, title, message, extra=None):
        try:
            response = PushClient().publish(
                PushMessage(to=token,
                            title=title,
                            body=message,
                            data=extra))
        except PushServerError as exc:
            # Encountered some likely formatting/validation error.
            rollbar.report_exc_info(
                extra_data={
                    'token': token,
                    'title': title,
                    'message': message,
                    'extra': extra,
                    'errors': exc.errors,
                    'response_data': exc.response_data,
                })
            raise
        except (ConnectionError, HTTPError) as exc:
            # Encountered some Connection or HTTP error - retry a few times in
            # case it is transient.
            rollbar.report_exc_info(
                extra_data={'token': token, 'title': title, 'message': message, 'extra': extra})
            raise self.retry(exc=exc)

        try:
            # We got a response back, but we don't know whether it's an error yet.
            # This call raises errors so we can handle them with normal exception
            # flows.
            response.validate_response()
        except DeviceNotRegisteredError:
            # Mark the push token as inactive
            from notifications.models import PushToken
            PushToken.objects.filter(token=token).update(active=False)
        except PushResponseError as exc:
            # Encountered some other per-notification error.
            rollbar.report_exc_info(
                extra_data={
                    'token': token,
                    'title': title,
                    'message': message,
                    'extra': extra,
                    'push_response': exc.push_response._asdict(),
                })
            raise self.retry(exc=exc)


# FirestoreUpload.uploadMultiNotice()
# FirestoreUpload.saveLastVisitedListId("20013DA1", "11899")

# if __name__ == "__main__":
#     FirestoreUpload.getPushTokenByDepartment("일반공지")
#     ExpoPushNotification.send_push_message(
#         token = "ExponentPushToken[xJojsCLoziyuRWA29AuUPq]", title = "title1", message = "message1")
if __name__ == '__main__':
    FirestoreUpload.uploadMultiNotice()
