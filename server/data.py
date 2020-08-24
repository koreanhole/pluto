import attr
from util import getDeptName
import datetime
import re
import urllib.parse as urlparse
from bs4 import BeautifulSoup
import ssl
from urllib.request import Request, urlopen


@attr.s(frozen=True)
class Notice(object):
    isNoticeValid: bool = attr.ib()
    # 전체공지 / 공과대학 / 정경대학 / 인문대학 / 자연과학대학

    @attr.s(frozen=True)
    class TypicalNotice(object):
        # url 주소
        url: str = attr.ib()
        # 학과코드 ex. FA1
        deptCode: str = attr.ib()
        # 학과이름 ex. 공과대학
        deptName: str = attr.ib()
        # 공지사항 ID
        listId: str = attr.ib()
        # 공지사항 제목
        title: str = attr.ib()
        # 작성자 이름
        authorName: str = attr.ib()
        # 작성자 부서
        authorDept: str = attr.ib()
        # 생성일자
        createdDate: str = attr.ib()
        # 생성일자 timestamp
        createdDateTimestamp: str = attr.ib()
        # 첨부파일 링크
        attachmentLink: str = attr.ib()
        # 공지사항 내용 html
        contentHtml: str = attr.ib()
        # 공지사항 내용 문자열
        contentString: str = attr.ib()

        @classmethod
        def from_url(cls, deptCode: str, listId: int):
            # url에서 html 가져오기
            query = "list_id=" + deptCode + "&seq=" + str(listId)
            base_url = "https://www.uos.ac.kr"
            url = "https://www.uos.ac.kr/korNotice/view.do?" + query

            context = ssl._create_unverified_context()
            req = Request(url)
            res = urlopen(req, context=context)
            html = res.read()
            soup = BeautifulSoup(html, "html.parser")
            # 공지사항의 등록 여부 판단
            try:
                noticeSoup = soup.find("ul", class_="listType view")
                noticeHeaderSoup = noticeSoup.find("li")
                noticeInformationSoup = noticeHeaderSoup.find("ul")

                # 글의 링크
                url = url
                # 분류
                deptCode = deptCode
                # 글 번호
                listId = str(listId)
                # 제목
                title = noticeHeaderSoup.find("span").text
                # 작성자
                authorNameSoup = noticeInformationSoup.find("li")
                authorName = authorNameSoup.text
                # 작성자 소속
                authorDeptSoup = authorNameSoup.find_next_sibling()
                authorDept = authorDeptSoup.text
                # 글이 게제된 부서(ex. 일반공지)
                deptName = getDeptName(deptCode, authorDept)
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

                return cls(
                    url=url,
                    deptCode=deptCode,
                    deptName=deptName,
                    listId=listId,
                    title=title,
                    authorName=authorName,
                    authorDept=authorDept,
                    createdDate=createdDate,
                    createdDateTimestamp=createdDateTimestamp,
                    attachmentLink=attachmentLink,
                    contentHtml=contentHtml,
                    contentString=contentString,
                )
            except (AttributeError, UnboundLocalError):
                print("notice not found error: " + str(listId))
                pass

    @classmethod
    def to_dict(cls, deptCode: str, listId: int):
        parsedNotice = cls.TypicalNotice.from_url(deptCode, listId)
        if parsedNotice is not None:
            return {
                u"url": parsedNotice.url,
                u"deptCode": parsedNotice.deptCode,
                u"deptName": parsedNotice.deptName,
                u"listId": parsedNotice.listId,
                u"title": parsedNotice.title,
                u"authorName": parsedNotice.authorName,
                u"authorDept": parsedNotice.authorDept,
                u"createdDate": parsedNotice.createdDate,
                u"createdDateTimestamp": parsedNotice.createdDateTimestamp,
                u"attachmentLink": parsedNotice.attachmentLink,
                u"contentHtml": parsedNotice.contentHtml,
                u"contentString": parsedNotice.contentString,
            }
