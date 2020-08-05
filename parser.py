from urllib.request import Request, urlopen
import ssl
from bs4 import BeautifulSoup
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

    noticeSoup = soup.find("ul", class_="listType view")

    noticeHeaderSoup = noticeSoup.find("li")
    noticeInformationSoup = noticeHeaderSoup.find("ul")
    # 글의 링크
    url = url
    # 글이 게제된 부서(ex. 일반공지)
    deptName = getDeptName(deptCode)
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
    # 첨부파일 링크
    attachmentLink = []
    for downloadSoup in noticeSoup.find_all("a", class_="dbtn"):
        attachmentLink.append(base_url + downloadSoup['href'])
    # 내용(html)
    contentHtmlSoup = soup.find(id="view_content")
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
        u"attachmentLink": attachmentLink,
        u"contentHtml": contentHtml,
        u"contentString": contentString,
    }
