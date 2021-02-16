import { Injectable, Logger } from '@nestjs/common';
import { DepartmentService } from '../department/department.service';
import { NoticeService } from '../notice/notice.service';
import { getRecentListIds, getNoticeData } from './scrapper.util';
import { Cron, SchedulerRegistry, CronExpression } from '@nestjs/schedule';

const CRON_NAME = 'SCRAPPING';

@Injectable()
export class ScrapperService {
  constructor(
    private departmentService: DepartmentService,
    private noticeService: NoticeService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  private logger = new Logger(ScrapperService.name);

  @Cron(CronExpression.EVERY_5_MINUTES, { name: CRON_NAME })
  async scrapNotice() {
    this.logger.debug('scrapper started');
    const departments = await this.departmentService.getAllDepartment();

    this.schedulerRegistry.getCronJob(CRON_NAME).stop();
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
    });
    this.logger.debug('scrapper end');
    this.schedulerRegistry.getCronJob(CRON_NAME).start();
  }
}
