from enum import Enum
import re
from bs4 import BeautifulSoup
import ssl
from urllib.request import Request, urlopen
import json
import pprint

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

# 경영대학
BusinessClassification = {
    "20008N2": "경영대학"
}
# 경영대학 학부
BusinessDepartment = [
    "경영학부"
]

# 국제교육원
InterChangeClassification = {
    "40013F1": "국제교류과"
}

InterChange = [
    "국제교육원"
]

# 생활관
DormitoryClassification = {
    "40020D92": "생활관"
}

Dormitory = [
    "생활관"
]


class DepartmentType(Enum):
    General = "전체공지"
    Engineering = "공과대학"
    Economics = "정경대학"
    Humanities = "인문대학"
    NaturalScience = "자연과학대학"
    Business = "경영대학"
    InterChange = "국제교류과"
    Dormitory = "생활관"


class AttributeType(Enum):
    Href = "href"
    Onclick = "onclick"


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
        "scien01": 1,
        "20008N2": 1,
        "40013F1": 1,
        "40020D92": 1,
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
    elif BusinessClassification.get(deptCode):
        return "경영학부"
    elif InterChangeClassification.get(deptCode):
        return "국제교육원"
    elif DormitoryClassification.get(deptCode):
        return "생활관"


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
    elif BusinessClassification.get(deptCode):
        return DepartmentType.Business
    elif InterChangeClassification.get(deptCode):
        return DepartmentType.InterChange
    elif DormitoryClassification.get(deptCode):
        return DepartmentType.Dormitory


def getTypicalNoticeLastid(deptCode: str):
    deptType = getDeptType(deptCode)
    query = "list_id=" + deptCode

    # 전체 공지의 경우
    if deptType == DepartmentType.General:
        url = "https://www.uos.ac.kr/korNotice/list.do?" + query

        context = ssl._create_unverified_context()
        req = Request(url)
        res = urlopen(req, context=context)
        html = res.read()

        soup = BeautifulSoup(html, "html.parser")

        noticeListSoup = soup.find("ul", class_="listType")
        lastNoticeSoup = noticeListSoup.find("a", {"href": "#"})

        try:
            # onclick = fnView('1', '22529'); 에서 함수 파라미터만 추출
            matched = re.match(r"[^(]*\(([^)]*)\)", lastNoticeSoup["onclick"])
            paramList = matched[1].split(",")
            # 파라미터 중 두번째 파라미터가 listId이므로 이것만 반환
            lastId = paramList[1].replace("'", "")
            return int(lastId)
        except:
            print("공지사항 마지막 listId를 불러오는데 실패 -> " + deptCode)

    # 공과대학 / 정경대학 / 인문대학 / 자연과학대학 경우
    elif deptType == DepartmentType.Engineering or deptType == DepartmentType.Humanities or deptType == DepartmentType.NaturalScience:
        url = "https://www.uos.ac.kr/korNotice/list.do?" + query

        context = ssl._create_unverified_context()
        req = Request(url)
        res = urlopen(req, context=context)
        html = res.read()

        soup = BeautifulSoup(html, "html.parser")

        noticeListContainerSoup = soup.find("div", class_="table-style")
        for noticeItemSoup in noticeListContainerSoup.find_all("div", class_="tb-body"):
            if noticeItemSoup.find(lambda tag: tag.name == "ul" and tag.get("class") == ['clearfix']):
                noticeListSoup = noticeItemSoup.find(
                    lambda tag: tag.name == "ul" and tag.get("class") == ['clearfix'])
                break
        lastNoticeSoup = noticeListSoup.find("a", {"href": "#a"})
        try:
            # onclick = fnView('1', '22529'); 에서 함수 파라미터만 추출
            matched = re.match(r"[^(]*\(([^)]*)\)", lastNoticeSoup["onclick"])
            paramList = matched[1].split(",")
            # 파라미터 중 두번째 파라미터가 listId이므로 이것만 반환
            lastId = paramList[1].replace("'", "")
            return int(lastId)
        except:
            print("공지사항 마지막 listId를 불러오는데 실패 -> " + deptCode)

    # 경영대학의 경우
    elif deptType == DepartmentType.Business:
        url = "https://biz.uos.ac.kr/korNotice/list.do?" + query
        selector = "#container > div > ul > li:nth-child(6) > a"
        attributType = AttributeType.Href

        return getLastNoticeListId(deptCode, url, selector, attributeType)

    # 국제교류과의 경우
    elif deptType == DepartmentType.InterChange:
        url = "https://kiice.uos.ac.kr/korNotice/list.do?" + query
        selector = "#subContents > table > tbody > tr:nth-child(3) > td.title > a"
        attributeType = AttributeType.Onclick

        return getLastNoticeListId(deptCode, url, selector, attributeType)

    # 생활관의 경우
    elif deptType == DepartmentType.Dormitory:
        url = "https://dormitory.uos.ac.kr/korNotice/list.do?" + query
        selector = "#container > div.subCont > div.contents > ul > li:nth-child(1) > a"
        attributeType = AttributeType.Href

        return getLastNoticeListId(deptCode, url, selector, attributeType)

    # 정경대학의 경우
    elif deptType == DepartmentType.Economics:
        subQuery = "&cate_id2=000010005"
        url = "https://www.uos.ac.kr/social/korNotice/list.do?" + query + subQuery
        selector = "#content02 > div.sc-right > div.table-style > div:nth-child(2) > ul > li.tb-wid02.txl > a"
        attributeType = AttributeType.Onclick

        return getLastNoticeListId(deptCode, url, selector, attributeType)


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


def getLastNoticeListId(deptCode: str, url: str, selector: str, attributeType: AttributeType):
    context = ssl._create_unverified_context()
    req = Request(url)
    res = urlopen(req, context=context)
    html = res.read()

    soup = BeautifulSoup(html, "html.parser")
    lastNoticeSoup = soup.select(selector)[0].get(attributeType.value)
    try:
        # onclick = fnView('1', '22529'); 에서 함수 파라미터만 추출
        matched = re.match(r"[^(]*\(([^)]*)\)", lastNoticeSoup)
        paramList = matched[1].split(",")
        # 파라미터 중 두번째 파라미터가 listId이므로 이것만 반환
        lastId = paramList[1].replace("'", "")
        return int(lastId)
    except:
        print("공지사항 마지막 listId를 불러오는데 실패 -> " + deptCode)
