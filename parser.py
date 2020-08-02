from urllib.request import Request, urlopen
import ssl
from bs4 import BeautifulSoup


def parseNotice(type: str, listId: str):
    query = "list_id=" + type + "&seq=" + listId

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
    contentHtml = soup.find(id="view_content")
    # 내용(string)
    contentString = contentHtml.text
    # 분류
    type = type
    # 글 번호
    listId = listId

    return {
        u"type": type,
        u"listId": listId,
        u"title": title,
        u"authorName": authorName,
        u"authorDept": authorDept,
        u"createdDate": createdDate,
        u"attachmentLink": attachmentLink,
        u"contentHtml": str(contentHtml),
        u"contentString": contentString,
    }
