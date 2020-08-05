import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from parser import parseNotice
from util import getDeptName

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

deptCode = "FA1"
# listId = "22523"
deptName = getDeptName(deptCode)

notice_ref = db.collection("notice").document("department_type")
for listId in range(22490, 22529):
    notice_item_ref = notice_ref.collection(deptName).document(str(listId))
    notice_item_ref.set(parseNotice(deptCode, str(listId)))
