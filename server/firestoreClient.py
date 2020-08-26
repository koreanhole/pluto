import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from data import Notice
from util import getTypicalNoticeLastid, getInitialListId, saveToJsonFile, loadFromJson, updateLastSavedListId
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
                    deptCode = addedDocument.get("deptCode")
                    deptName = addedDocument.get("deptName")
                    title = addedDocument.get("title")
                    listId = addedDocument.get("listId")
                    pushTokenList = FirestoreUpload.getPushTokenByDepartment(
                        deptName=deptName)
                    extraData = {
                        "deptCode": deptCode,
                        "listId": str(listId)
                    }
                    for token in pushTokenList:
                        ExpoPushNotification.send_push_message(
                            token=token, title=deptName, message=title, extra=extraData)
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


if __name__ == '__main__':
    while True:
        FirestoreUpload.uploadMultiNotice()
        time.sleep(1)
