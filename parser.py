from urllib.request import Request, urlopen
import ssl
from bs4 import BeautifulSoup
import datetime
from util import getDeptName
import re


def parseNotice(deptCode: str, listId: str):
    query = "list_id=" + deptCode + "&seq=" + listId

    base_url = "https://www.uos.ac.kr"
    url = "https://www.uos.ac.kr/korNotice/view.do?" + query

    context = ssl._create_unverified_context()
    req = Request(url)
    res = urlopen(req, context=context)
    html = res.read()

    soup = BeautifulSoup(html, "html.parser")

    # 공지사항이 등록되어있지 않음
    try:
        noticeSoup = soup.find("ul", class_="listType view")
        noticeHeaderSoup = noticeSoup.find("li")
        noticeInformationSoup = noticeHeaderSoup.find("ul")
    except AttributeError:
        print("error: " + listId)
        return

    # 글의 링크
    url = url
    # 글이 게제된 부서(ex. 일반공지)
    deptName = getDeptName(deptCode).get("deptName")
    # 제목
    title = noticeHeaderSoup.find("span").text
    # 작성자
    authorNameSoup = noticeInformationSoup.find("li")
    authorName = authorNameSoup.text
    # 작성자 소속
    authorDeptSoup = authorNameSoup.find_next_sibling()
    authorDept = authorDeptSoup.text
    # 작성일
    createdDateSoup = authorDeptSoup.find_next_sibling()
    createdDate = createdDateSoup.text
    # 작성일 timestamp
    createdDateTimestamp = datetime.datetime.strptime(
        createdDate, "%Y-%m-%d")
    # 첨부파일 링크
    attachmentLink = []
    for downloadSoup in noticeSoup.find_all("a", class_="dbtn"):
        attachmentLink.append(
            {"file_name": downloadSoup.text.lstrip(), "file_link": base_url+downloadSoup['href']})
    # 내용(html)
    contentHtmlSoup = noticeSoup.find(id="view_content")
    # li tag 를 div tag로 바꿈
    contentHtmlSoup.name = "div"
    # font-family attribute 삭제
    contentHtml = re.sub(
        r"\s*font-family\s*:\s*[^;]*;", "", str(contentHtmlSoup))
    # 내용(string)
    contentString = contentHtmlSoup.text
    # 분류
    deptCode = deptCode
    # 글 번호
    listId = listId

    return {
        u"url": url,
        u"deptCode": deptCode,
        u"deptName": deptName,
        u"listId": listId,
        u"title": title,
        u"authorName": authorName,
        u"authorDept": authorDept,
        u"createdDate": createdDate,
        u"createdDateTimestamp": createdDateTimestamp,
        u"attachmentLink": attachmentLink,
        u"contentHtml": contentHtml,
        u"contentString": contentString,
    }


def getNoticeLastid(deptCode: str, deptType: str):
    query = "list_id=" + deptCode

    base_url = "https://www.uos.ac.kr"
    url = "https://www.uos.ac.kr/korNotice/list.do?" + query

    context = ssl._create_unverified_context()
    req = Request(url)
    res = urlopen(req, context=context)
    html = res.read()

    soup = BeautifulSoup(html, "html.parser")

    # 전체 공지의 경우
    if deptType == "전체공지":
        noticeListSoup = soup.find("ul", class_="listType")
        lastNoticeSoup = noticeListSoup.find("a", {"href": "#"})

    # 공과대학 / 정경대학 / 인문대학 / 자연과학대학 경우
    elif deptType == "공과대학" or deptType == "정경대학" or deptType == "인문대학" or deptType == "자연과학대학":
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
