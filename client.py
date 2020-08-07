import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from parser import parseNotice, getNoticeLastid
from util import getDeptName

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

# deptCode = "FA35"
# deptName = getDeptName(deptCode)
# startListId = 487
# lastListId = getNoticeLastid(deptCode)

# notice_ref = db.collection("notice")
# for listId in range(startListId, lastListId + 1):
#     notice_item_ref = notice_ref.document(str(listId))
#     parsedNotice = parseNotice(deptCode, str(listId))
#     if parsedNotice is not None:
#         try:
#             notice_item_ref.set(parsedNotice)
#         except:
#             print("error")

notice_ref = db.collection("notice")
deptCode = "FA1"
listId = 22536
notice_item_ref = notice_ref.document(str(listId))
parsedNotice = parseNotice(deptCode, str(listId))

print(getNoticeLastid(deptCode, getDeptName(deptCode).get("deptType")))
print(parsedNotice)

if parsedNotice is not None:
    try:
        notice_item_ref.set(parsedNotice)
    except:
        print("error")
