import { Injectable, Logger } from '@nestjs/common';
import { DepartmentService } from '../department/department.service';
import { NoticeService } from '../notice/notice.service';
import { getRecentListIds, getNoticeData } from './scrapper.util';
import { Interval, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class ScrapperService {
  constructor(
    private departmentService: DepartmentService,
    private noticeService: NoticeService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  private logger = new Logger(ScrapperService.name);

  @Interval('scrapping', 10000)
  async scrapNotice() {
    this.logger.debug('scrapper started');
    const departments = await this.departmentService.getAllDepartment();

    departments.forEach(async (department) => {
      const {
        id,
        deptCode,
        subDeptCode,
        deptType,
        lastFetchedListId,
      } = department;

      const recentListIds = await getRecentListIds({
        deptCode,
        subDeptCode,
        deptType,
        lastFetchedListId,
      });

      if (recentListIds.length == 0) {
        return;
      }

      this.logger.debug(recentListIds);

      this.schedulerRegistry.deleteInterval('scrapping');
      recentListIds.forEach(async (listId) => {
        const noticeData = await getNoticeData({
          listId,
          deptCode,
          subDeptCode,
          departmentId: id,
        });
        if (noticeData !== null) {
          await this.noticeService.createNotice(noticeData);
        }
      });
      await this.departmentService.updateLastFetchedListId(
        id,
        recentListIds[0],
      );
      this.schedulerRegistry.addInterval(
        'scrapping',
        setInterval(() => this.logger.debug('scrapper resumed'), 10000),
      );
    });
  }
}
