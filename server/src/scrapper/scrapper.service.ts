import { Injectable, Logger } from '@nestjs/common';
import { DepartmentService } from '../department/department.service';
import { NoticeService } from '../notice/notice.service';
import { getDepartmentLastListId, getNoticeData } from './scrapper.util';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class ScrapperService {
  constructor(
    private departmentService: DepartmentService,
    private noticeService: NoticeService,
  ) {}
  private logger = new Logger(ScrapperService.name);

  @Interval(10000)
  async scrapNotice() {
    this.logger.debug('scrapper started');
    const departments = await this.departmentService.getAllDepartment();

    departments.forEach(async (department) => {
      const { id, deptCode, deptType, lastFetchedListId } = department;
      const lastListId = await getDepartmentLastListId(deptCode, deptType);

      let currentListId = lastFetchedListId;
      while (parseInt(lastListId) > parseInt(currentListId)) {
        const noticeData = await getNoticeData(lastListId, deptCode, id);
        await this.noticeService.createNotice(noticeData);
        await this.departmentService.updateLastFetchedListId(
          id,
          noticeData.listId,
        );
        currentListId += 1;
      }
    });
  }
}
