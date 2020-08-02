import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from parser import parseNotice

cred = credentials.Certificate('./ServiceAccountKey.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

type = "FA1"
listId = "22478"

doc_ref = db.collection(type).document(listId)
doc_ref.set(parseNotice(type, listId))
