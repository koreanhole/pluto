from enum import Enum
import re
from bs4 import BeautifulSoup
import ssl
from urllib.request import Request, urlopen

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
# 정경대학
EconomicsClassification = {
    "econo01": "정경대학",
}
# 인문대학
HumanityClassification = {
    "human01": "인문대학",
}
# 자연과학대학
NaturalScienceClassification = {
    "scien01": "자연과학대학",
}


class DepartmentType(Enum):
    General = "전체공지"
    Engineering = "공과대학"
    Economics = "정경대학"
    Humanities = "인문대학"
    NaturalScience = "자연과학대학"


def getDeptName(deptCode: str):
    if GeneralClassification.get(deptCode):
        return GeneralClassification.get(deptCode)
    elif EngineeringClassification.get(deptCode):
        return EngineeringClassification.get(deptCode)
    elif EconomicsClassification.get(deptCode):
        return EconomicsClassification.get(deptCode)
    elif HumanityClassification.get(deptCode):
        return HumanityClassification.get(deptCode)
    elif NaturalScienceClassification.get(deptCode):
        return NaturalScienceClassification.get(deptCode)


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
