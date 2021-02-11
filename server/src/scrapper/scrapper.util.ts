import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { CreateNoticeInput } from '../notice/notice.input';
import { AttachmentLinks } from '../notice/notice.entity';
import { Logger } from '@nestjs/common';
import { DeptType } from '../department/department.enum';

async function getCheerio(url: string) {
  const logger = new Logger('Scrapper Utils');

  const html = await axios.get(url);

  if (html === null) {
    logger.debug(`notice last listId not found, url: ${url}`);
    return null;
  }
  const $ = cheerio.load(html.data);

  return $;
}

// 공지사항의 최신 listId를 가져온다.
export async function getDepartmentLastListId(
  deptCode: string,
  subDeptCode: string,
  deptType: DeptType,
): Promise<string> {
  let fnView: string;
  if (
    deptType == DeptType.General ||
    deptType == DeptType.Bachelor ||
    deptType == DeptType.Recruit ||
    deptType == DeptType.Enterpreneur ||
    deptType == DeptType.Bidding ||
    deptType == DeptType.Facility
  ) {
    const url =
      'https://www.uos.ac.kr/korNotice/list.do?' + 'list_id=' + deptCode;

    const $ = await getCheerio(url);
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
    deptType == DeptType.Civil ||
    deptType == DeptType.Politics ||
    deptType == DeptType.Adminstration ||
    deptType == DeptType.InternationalRelation ||
    deptType == DeptType.Economics ||
    deptType == DeptType.SocialWelfare ||
    deptType == DeptType.Taxation ||
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
    const url =
      'https://www.uos.ac.kr/korNotice/list.do?' +
      'list_id=' +
      deptCode +
      '&cate_id2=' +
      subDeptCode;

    const $ = await getCheerio(url);

    fnView = $('div.tb-body')
      .find('ul[class="clearfix"] > li > a')
      .attr('onclick');
  } else if (deptType == DeptType.Business) {
    const url =
      'https://biz.uos.ac.kr/korNotice/list.do?' + 'list_id=' + deptCode;
    const $ = await getCheerio(url);

    fnView = $('div.contents')
      .find('ul.listType > li:not(.on) > a')
      .attr('href');
  } else if (deptType == DeptType.InterChange) {
    const url =
      'https://kiice.uos.ac.kr/korNotice/list.do?' + 'list_id=' + deptCode;
    const $ = await getCheerio(url);

    fnView = $('div#subContents')
      .find('tbody > tr:not(.noti) > td > a')
      .attr('onclick');
  } else if (deptType == DeptType.Dormitory) {
    const url =
      'https://dormitory.uos.ac.kr/korNotice/list.do?' + 'list_id=' + deptCode;
    const $ = await getCheerio(url);

    fnView = $('div.contents').find('ul > li:not(.on) > a').attr('href');
  }

  // fnView('0', '23240'); 에서 2번째 parameter가 해당 deptCode의 마지막 listId이다.
  const lastListIdRegex = new RegExp(`, '(.*?)'`);
  return fnView.match(lastListIdRegex)[1];
}

export async function getNoticeData(
  listId: string,
  deptCode: string,
  subDeptCode: string,
  departmentId: string,
): Promise<CreateNoticeInput> {
  const logger = new Logger('Scrapper Utils');
  const url =
    'https://www.uos.ac.kr/korNotice/view.do?' +
    'list_id=' +
    deptCode +
    '&seq=' +
    listId +
    '&cate_id2=' +
    subDeptCode +
    listId;

  let html: AxiosResponse;

  console.log(url);

  try {
    html = await axios.get(url);
  } catch (error) {
    logger.warn(`Notice Data not found, url: ${url}`);
  }

  const $ = cheerio.load(html.data);

  const $notice = $('div#contents ul.listType.view');
  const $noticeHeader = $notice.find('li');
  const $author = $noticeHeader.find('ul');

  if ($notice.find('li#view_content').html() == null) {
    logger.debug(`notice not found, listId: ${listId}, url: ${url}`);
    return null;
  }

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

  const createdDatetimeString = $author.find('li').next().next().first().text();

  const result: CreateNoticeInput = {
    url,
    listId,
    department: departmentId,
    title: $noticeHeader.find('span').first().text(),
    authorName: $author.find('li').first().text(),
    authorDept: $author.find('li').next().first().text(),
    createdDatetime: new Date(createdDatetimeString).toISOString(),
    attachmentLinks,
    contentHtml,
    contentString: $notice.find('li#view_content').text(),
  };
  return result;
}
