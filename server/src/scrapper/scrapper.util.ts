import * as cheerio from 'cheerio';
import { CreateNoticeInput } from '../notice/notice.input';
import { AttachmentLinks } from '../notice/notice.entity';
import { Logger } from '@nestjs/common';
import { DeptType } from '../department/department.enum';
import { GetRecentListIdsInput, GetNoticeDataInput } from './scrapper.input';
import { axiosInstance } from 'src/config/axios.config';

async function getCheerio(url: string) {
  // const logger = new Logger('Scrapper Utils');
  const html = await axiosInstance.get(url);

  if (typeof html !== 'undefined') {
    return cheerio.load(html.data);
  }
}

// 공지사항의 최신 listId를 가져온다.
export async function getRecentListIds(
  getRecentListIdsInput: GetRecentListIdsInput,
): Promise<string[]> {
  const {
    deptCode,
    subDeptCode,
    deptType,
    lastFetchedListId,
  } = getRecentListIdsInput;
  const result: string[] = [];
  // fnView('0', '23240'); 에서 2번째 parameter가 해당 deptCode의 마지막 listId이다.
  const fnViewRegex = new RegExp(`, '(.*?)'`);
  let newListId = '1000000';
  let pageIndex = '1';

  if (
    deptType == DeptType.General ||
    deptType == DeptType.Bachelor ||
    deptType == DeptType.Recruit ||
    deptType == DeptType.Enterpreneur ||
    deptType == DeptType.Bidding ||
    deptType == DeptType.Facility
  ) {
    const url = `https://uos.ac.kr/korNotice/list.do?list_id=${deptCode}`;
    const $ = await getCheerio(url);
    const lastPageIndex = $('div.mTot').contents().text().substring(1);

    while (parseInt(newListId) >= parseInt(lastFetchedListId)) {
      if (parseInt(lastPageIndex) <= parseInt(pageIndex)) {
        return result;
      }
      const $ = await getCheerio(url + `&pageIndex=${pageIndex}`);
      $('ul.listType')
        .find('li:not(.on)')
        .each((_, element) => {
          const onClickAttribute = $(element).find('a').attr('onclick');
          if (typeof onClickAttribute !== 'undefined') {
            newListId = onClickAttribute.match(fnViewRegex)[1];
            if (parseInt(newListId) <= parseInt(lastFetchedListId)) {
              return false;
            }
            result.push(newListId);
          }
        });
      pageIndex = (parseInt(pageIndex) + 1).toString();
    }
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
    const url = `https://uos.ac.kr/korNotice/list.do?list_id=${deptCode}&cate_id2=${subDeptCode}`;

    while (parseInt(newListId) >= parseInt(lastFetchedListId)) {
      const $ = await getCheerio(url + `&pageIndex=${pageIndex}`);
      if ($('li.tb-wid02 a').text().trim() === '게시글이 없습니다') {
        return result;
      }
      $('div.table-style')
        .find('ul.clearfix:not(.on)')
        .each((_, element) => {
          const onClickAttribute = $(element).find('a').attr('onclick');
          if (typeof onClickAttribute !== 'undefined') {
            newListId = onClickAttribute.match(fnViewRegex)[1];
            if (parseInt(newListId) <= parseInt(lastFetchedListId)) {
              return false;
            }
            result.push(newListId);
          }
        });
      pageIndex = (parseInt(pageIndex) + 1).toString();
    }
  } else if (deptType == DeptType.Business) {
    const url = `https://biz.uos.ac.kr/korNotice/list.do?list_id=${deptCode}`;
    while (parseInt(newListId) >= parseInt(lastFetchedListId)) {
      const $ = await getCheerio(url + `&pageIndex=${pageIndex}`);
      if ($('ul.listType').text().trim() === '글이 없습니다') {
        return result;
      }
      $('ul.listType')
        .find('li:not(.on)')
        .each((_, element) => {
          const onClickAttribute = $(element).find('a').attr('href');
          if (
            typeof onClickAttribute !== 'undefined' &&
            onClickAttribute !== '#a'
          ) {
            newListId = onClickAttribute.match(fnViewRegex)[1];
            if (parseInt(newListId) <= parseInt(lastFetchedListId)) {
              return false;
            }
            result.push(newListId);
          }
        });
      pageIndex = (parseInt(pageIndex) + 1).toString();
    }
  } else if (deptType == DeptType.InterChange) {
    const url = `https://kiice.uos.ac.kr/korNotice/list.do?list_id=${deptCode}`;
    while (parseInt(newListId) >= parseInt(lastFetchedListId)) {
      const $ = await getCheerio(url + `&pageIndex=${pageIndex}`);
      if ($('tbody tr td').text().trim() === '글이 없습니다.') {
        return result;
      }
      $('tbody')
        .find('tr:not(.noti)')
        .each((_, element) => {
          const onClickAttribute = $(element).find('a').attr('onclick');
          if (typeof onClickAttribute !== 'undefined') {
            newListId = onClickAttribute.match(fnViewRegex)[1];
            if (parseInt(newListId) <= parseInt(lastFetchedListId)) {
              return false;
            }
            result.push(newListId);
          }
        });
      pageIndex = (parseInt(pageIndex) + 1).toString();
    }
  } else if (deptType == DeptType.Dormitory) {
    const url = `https://dormitory.uos.ac.kr/korNotice/list.do?list_id=${deptCode}`;
    while (parseInt(newListId) >= parseInt(lastFetchedListId)) {
      const $ = await getCheerio(url + `&pageIndex=${pageIndex}`);
      if ($('ul.listType.line01 li').text().trim() === '글이 없습니다') {
        return result;
      }
      $('ul.listType')
        .find('li:not(.on)')
        .each((_, element) => {
          const onClickAttribute = $(element).find('a').attr('href');
          if (
            typeof onClickAttribute !== 'undefined' &&
            onClickAttribute !== '#a'
          ) {
            newListId = onClickAttribute.match(fnViewRegex)[1];
            if (parseInt(newListId) <= parseInt(lastFetchedListId)) {
              return false;
            }
            result.push(newListId);
          }
        });
      pageIndex = (parseInt(pageIndex) + 1).toString();
    }
  }
  return result;
}

export async function getNoticeData(
  getNoticeDataInput: GetNoticeDataInput,
): Promise<CreateNoticeInput> {
  const { listId, deptCode, subDeptCode, departmentId } = getNoticeDataInput;

  const logger = new Logger('Scrapper Utils');
  let url = `https://www.uos.ac.kr/korNotice/view.do?list_id=${deptCode}&seq=${listId}`;

  if (typeof subDeptCode !== 'undefined' && subDeptCode.trim() !== '') {
    url += '&cate_id2=' + subDeptCode;
  }
  const $ = await getCheerio(url);

  const $notice = $('div#contents ul.listType.view');
  const $noticeHeader = $notice.find('li');
  const $author = $noticeHeader.find('ul');

  if ($notice.find('li#view_content').html() == null) {
    logger.debug(`notice not found, listId: ${listId}, url: ${url}`);
    return;
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
