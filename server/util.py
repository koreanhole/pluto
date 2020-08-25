from enum import Enum
import re
from bs4 import BeautifulSoup
import ssl
from urllib.request import Request, urlopen
import json

# 전체공지
GeneralClassification = {
    "FA1": "일반공지",
    "FA2": "학사공지",
    "FA34": "직원채용",
    "FA35": "창업공지",
    "FA22": "입찰공고",
    "FA25": "시설공사",
}

# 공과대학
EngineeringClassification = {
    "20013DA1": "공과대학",
}
# 공과대학 학부
EngineeringDepartment = [
    "전자전기컴퓨터공학부",
    "컴퓨터과학부",
    "화학공학과",
    "기계정보공학과",
    "신소재공학과",
    "토목공학과",
]

# 정경대학
EconomicsClassification = {
    "econo01": "정경대학",
}
# 정경대학 학부
EconomicsDepartment = [
    "행정학과",
    "국제관계학과",
    "경제학부",
    "사회복지학과",
    "세무학과",
]
# 인문대학
HumanityClassification = {
    "human01": "인문대학",
}
# 인문대학 학부
HumanityDepartment = [
    "영어영문학과",
    "국어국문학과",
    "국사학과",
    "철학과",
    "중국어문화학과",
]
# 자연과학대학
NaturalScienceClassification = {
    "scien01": "자연과학대학",
}
# 자연과학대학 학부
NaturalScienceDepartment = [
    "수학과",
    "통계학과",
    "물리학과",
    "생명과학과",
    "환경원예학과",
]


class DepartmentType(Enum):
    General = "전체공지"
    Engineering = "공과대학"
    Economics = "정경대학"
    Humanities = "인문대학"
    NaturalScience = "자연과학대학"


def getInitialListId():
    return {
        "FA1": 7254,
        "FA2": 4244,
        "FA34": 1,
        "FA35": 1,
        "FA22": 152,
        "FA25": 31,
        "20013DA1": 1,
        "econo01": 1,
        "human01": 1,
        "scien01": 1
    }


def getDeptName(deptCode: str, authorDept: str):
    if GeneralClassification.get(deptCode):
        return GeneralClassification.get(deptCode)
    elif EngineeringClassification.get(deptCode):
        if authorDept in EngineeringDepartment:
            return authorDept
        else:
            return "공과대학"
    elif EconomicsClassification.get(deptCode):
        if authorDept in EconomicsDepartment:
            return authorDept
        else:
            return "정경대학"
    elif HumanityClassification.get(deptCode):
        if authorDept in HumanityDepartment:
            return authorDept
        else:
            "인문대학"
    elif NaturalScienceClassification.get(deptCode):
        if authorDept in NaturalScienceDepartment:
            return authorDept
        else:
            "자연과학대학"


def getDeptType(deptCode: str):
    if GeneralClassification.get(deptCode):
        return DepartmentType.General
    elif EngineeringClassification.get(deptCode):
        return DepartmentType.Engineering
    elif EconomicsClassification.get(deptCode):
        return DepartmentType.Economics
    elif HumanityClassification.get(deptCode):
        return DepartmentType.Humanities
    elif NaturalScienceClassification.get(deptCode):
        return DepartmentType.Humanities


def getTypicalNoticeLastid(deptCode: str):
    deptType = getDeptType(deptCode)
    query = "list_id=" + deptCode

    base_url = "https://www.uos.ac.kr"
    url = "https://www.uos.ac.kr/korNotice/list.do?" + query

    context = ssl._create_unverified_context()
    req = Request(url)
    res = urlopen(req, context=context)
    html = res.read()

    soup = BeautifulSoup(html, "html.parser")

    # 전체 공지의 경우
    if deptType == DepartmentType.General:
        noticeListSoup = soup.find("ul", class_="listType")
        lastNoticeSoup = noticeListSoup.find("a", {"href": "#"})

    # 공과대학 / 정경대학 / 인문대학 / 자연과학대학 경우
    elif deptType == DepartmentType.Engineering or deptType == DepartmentType.Economics or deptType == DepartmentType.Humanities or deptType == DepartmentType.NaturalScience:
        noticeListContainerSoup = soup.find("div", class_="table-style")
        for noticeItemSoup in noticeListContainerSoup.find_all("div", class_="tb-body"):
            if noticeItemSoup.find(lambda tag: tag.name == "ul" and tag.get("class") == ['clearfix']):
                noticeListSoup = noticeItemSoup.find(
                    lambda tag: tag.name == "ul" and tag.get("class") == ['clearfix'])
                break
        lastNoticeSoup = noticeListSoup.find("a", {"href": "#a"})

    # onclick = fnView('1', '22529'); 에서 함수 파라미터만 추출
    matched = re.match(r"[^(]*\(([^)]*)\)", lastNoticeSoup["onclick"])
    paramList = matched[1].split(",")
    # 파라미터 중 두번째 파라미터가 listId이므로 이것만 반환
    lastId = paramList[1].replace("'", "")
    return int(lastId)


def saveToJsonFile(data: dict):
    with open("fetchedLastVisitedListId.json", "w") as json_file:
        json.dump(data, json_file)


def loadFromJson():
    with open("fetchedLastVisitedListId.json", "r") as json_file:
        return json.load(json_file)


def updateLastSavedListId(deptCode: str, listId: int):
    savedListId = loadFromJson()
    savedListId[deptCode] = listId
    saveToJsonFile(savedListId)
