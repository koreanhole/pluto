import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { CreateNoticeInput } from '../notice/notice.input';
import { AttachmentLinks } from '../notice/notice.entity';
import { Logger } from '@nestjs/common';
import { DeptType } from '../department/department.enum';

// 공지사항의 최신 listId를 가져온다.
export async function getDepartmentLastListId(
  deptCode: string,
  deptType: DeptType,
): Promise<string> {
  const logger = new Logger('Scrapper Utils');

  const url =
    'https://www.uos.ac.kr/korNotice/list.do?' + 'list_id=' + deptCode;

  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  let fnView: string;
  if (
    deptType == DeptType.General ||
    deptType == DeptType.Bachelor ||
    deptType == DeptType.Recruit ||
    deptType == DeptType.Enterpreneur ||
    deptType == DeptType.Bidding ||
    deptType == DeptType.Facility
  ) {
    fnView = $('div#container div#contents')
      .find('ul.listType > li:not(.on) > a')
      .attr('onclick');
  } else if (
    deptType == DeptType.Engineering ||
    deptType == DeptType.Electronic ||
    deptType == DeptType.Computer ||
    deptType == DeptType.Chemical ||
    deptType == DeptType.Machine ||
    deptType == DeptType.NewMaterial ||
    deptType == DeptType.Humanitics ||
    deptType == DeptType.English ||
    deptType == DeptType.Korean ||
    deptType == DeptType.History ||
    deptType == DeptType.Philosophy ||
    deptType == DeptType.Chinese ||
    deptType == DeptType.NaturalScience ||
    deptType == DeptType.Mathematics ||
    deptType == DeptType.Statics ||
    deptType == DeptType.Physics ||
    deptType == DeptType.LifeScience ||
    deptType == DeptType.EnvironmentalGardening
  ) {
    fnView = $('div.tb-body')
      .find('ul[class="clearfix"] > li > a')
      .attr('onclick');
  } else if (deptType == DeptType.Business) {
    fnView = $('div.contents')
      .find('ul.listType > li:not(.on) > a')
      .attr('href');
  } else if (deptType == DeptType.InterChange) {
    fnView = $('div#subContents')
      .find('tbody > tr:not(.noti) > td > a')
      .attr('onclick');
  } else if (deptType == DeptType.Dormitory) {
    fnView = $('div.contents').find('ul > li:not(.on) > a').attr('href');
  }

  // fnView('0', '23240'); 에서 2번째 parameter가 해당 deptCode의 마지막 listId이다.
  const lastListIdRegex = new RegExp(`, '(.*?)'`);
  return fnView.match(lastListIdRegex)[1];
}

export async function getNoticeData(
  listId: string,
  deptCode: string,
  departmentId: string,
): Promise<CreateNoticeInput> {
  const logger = new Logger('Scrapper Utils');
  const url =
    'https://www.uos.ac.kr/korNotice/view.do?' +
    'list_id=' +
    deptCode +
    '&seq=' +
    listId;

  let html: AxiosResponse;

  try {
    html = await axios.get(url);
  } catch (error) {
    logger.warn(`Notice Data not found, url: ${url}`);
  }

  const $ = cheerio.load(html.data);

  const $notice = $('div#contents ul.listType.view');
  const $noticeHeader = $notice.find('li');
  const $author = $noticeHeader.find('ul');

  const attachmentLinks: AttachmentLinks[] = [];
  $notice.find('a.dbtn').each((_, element) => {
    attachmentLinks.push({
      fileLink: 'https://www.uos.ac.kr' + $(element).attr('href'),
      fileName: $(element).text().trimLeft(),
    });
  });

  // li tag 를 div tag로 바꿈
  let contentHtml = '<div>' + $notice.find('li#view_content').html() + '</div>';
  // font-family attribute 삭제
  contentHtml = contentHtml.replace(/\s*font-family\s*:\s*[^;]*;/g, '');

  const result: CreateNoticeInput = {
    url,
    listId,
    department: departmentId,
    title: $noticeHeader.find('span').first().text(),
    authorName: $author.find('li').first().text(),
    authorDept: $author.find('li').next().first().text(),
    createdDatetime: $author.find('li').next().next().first().text(),
    attachmentLinks,
    contentHtml,
    contentString: $notice.find('li#view_content').text(),
  };
  return result;
}
