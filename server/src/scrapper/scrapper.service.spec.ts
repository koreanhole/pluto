import { getNoticeData } from './scrapper.util';

describe('ScrapperUtils', () => {
  describe('일반, 학사, 채용, 창업, 입찰, 시설 공지', () => {
    it('parse notice', async () => {
      const createDepartmentInput = await getNoticeData(
        '23222',
        'FA1',
        'test_department_id',
      );
      expect(createDepartmentInput['url']).toBe(
        'https://www.uos.ac.kr/korNotice/view.do?list_id=FA1&seq=23222',
      );
      expect(createDepartmentInput.listId).toBe('23222');
      expect(createDepartmentInput.department).toBe('test_department_id');
      expect(createDepartmentInput.authorName).toBe('엄상섭');
      expect(createDepartmentInput.authorDept).toBe('학생과');
      expect(createDepartmentInput.createdDatetime).toBe(
        '2021-01-29T00:00:00.000Z',
      );
      expect(createDepartmentInput.attachmentLinks).toEqual([
        {
          fileName: '수강신청안내 PDF 영상미포함.pdf',
          fileLink:
            'https://www.uos.ac.kr/common/board-download.do?listId=FA1&seq=23222&fSeq=1',
        },
      ]);
      expect(createDepartmentInput.contentHtml).toBe(
        '<div><p>총학생회 비상대책위원회에서 제작한 </p><p>수강신청방법 안내집을 게시하오니 </p><p>많은 학생들의 이용 부탁드립니다.&nbsp; </p></div>',
      );
      expect(createDepartmentInput.contentString.replace(/\s/g, ''));
    });
  });
});
