import datetime


def getDeptName(deptCode: str):
    # 전체공지
    GeneralClassification = {
        "FA1": "일반공지",
        "FA2": "학사공지",
        "FA34": "직원채용",
        "FA35": "창업공지",
        "FA22": "입찰공고",
        "FA25": "시설공사",
        "ED3": "비교과교육",
    }
    # 공과대학
    EngineeringClassification = {
        "20013DA1": "공과대학",
    }
    if GeneralClassification.get(deptCode):
        return {"deptType": "전체공지", "deptName": GeneralClassification.get(deptCode)}
    elif EngineeringClassification.get(deptCode):
        return {"deptType": "공과대학", "deptName": EngineeringClassification.get(deptCode)}


print(getDeptName("20013DA1").get("deptName"))
