import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from data import Notice
from util import getTypicalNoticeLastid
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
            lastSavedListId = 0

        for listId in range(lastSavedListId, lastListId + 1):
            notice_ref = db.collection("notice").document(str(listId))
            parsedNotice = Notice.to_dict(deptCode, listId)

            print(deptCode, listId)
            if parsedNotice is not None:
                try:
                    notice_ref.set(parsedNotice)
                except:
                    print("error")
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
    deptName: str = attr.ib()
    title: str = attr.ib()
    id: str = attr.ib()
    initialState: bool = attr.ib()

    @classmethod
    def on_snapshot(cls, col_snapshot, changes, read_time):
        if not cls.initialState:
            for change in changes:
                addedDocument = change.document.to_dict()
                if change.type.name == 'ADDED':
                    print('deptName: ' + addedDocument.get("deptName"))
                    print('title: ' + addedDocument.get("title"))
                    print('noticeId: ' + change.document.id)
                elif change.type.name == 'MODIFIED':
                    print(addedDocument)
                    print('deptName: ' + addedDocument.get("deptName"))
                    print('title: ' + addedDocument.get("title"))
                    print('noticeId: ' + change.document.id)
        else:
            cls.initialState = False

    @classmethod
    def getAddedNotice(cls):
        cls.initialState = True
        print(cls.initialState)
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
FirestoreListener.getAddedNotice()

# if __name__ == "__main__":
#     ExpoPushNotification.send_push_message(
#         token = "ExponentPushToken[xJojsCLoziyuRWA29AuUPq]", title = "title1", message = "message1")
