import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from data import Notice
from util import getTypicalNoticeLastid, getDeptName
import ssl
from bs4 import BeautifulSoup
from urllib.request import Request, urlopen

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
deptCode = "scien01"
listId = 1023


def uploadSingleNotice(deptCode: str, listId: str):
    notice_ref = db.collection("notice").document("department")

    query = "list_id=" + deptCode + "&seq=" + listId
    base_url = "https://www.uos.ac.kr"
    url = "https://www.uos.ac.kr/korNotice/view.do?" + query

    context = ssl._create_unverified_context()
    req = Request(url)
    res = urlopen(req, context=context)
    html = res.read()

    parsedNotice = Notice.to_dict(html, url)
    print(getTypicalNoticeLastid(deptCode))
    print(parsedNotice)
    notice_item_ref = notice_ref.collection(
        parsedNotice.get("authorDept")).document(listId)

    if parsedNotice is not None:
        try:
            notice_item_ref.set(parsedNotice)
        except:
            print("error")


uploadSingleNotice(deptCode, str(listId))
