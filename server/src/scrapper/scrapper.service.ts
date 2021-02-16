import { Injectable, Logger } from '@nestjs/common';
import { DepartmentService } from '../department/department.service';
import { NoticeService } from '../notice/notice.service';
import { getRecentListIds, getNoticeData } from './scrapper.util';
import { Cron, SchedulerRegistry, CronExpression } from '@nestjs/schedule';
import { CreateNoticeInput } from '../notice/notice.input';

const CRON_NAME = 'SCRAPPING';

@Injectable()
export class ScrapperService {
  constructor(
    private departmentService: DepartmentService,
    private noticeService: NoticeService,
    private schedulerRegistry: SchedulerRegistry,
  ) {}
  private logger = new Logger(ScrapperService.name);

  @Cron(CronExpression.EVERY_5_SECONDS, { name: CRON_NAME })
  async scrapNotice() {
    this.logger.debug('scrapper started');
    const departments = await this.departmentService.getAllDepartment();

    this.schedulerRegistry.getCronJob(CRON_NAME).stop();

    for (const department of departments) {
      const {
        id,
        deptCode,
        subDeptCode,
        deptType,
        lastFetchedListId,
      } = department;
      let recentListIds: string[];
      try {
        recentListIds = await getRecentListIds({
          deptCode,
          subDeptCode,
          deptType,
          lastFetchedListId,
        });
      } catch (error) {
        this.logger.error('get recent listids error');
      }

      if (recentListIds.length == 0) {
        this.schedulerRegistry.getCronJob(CRON_NAME).start();
        return;
      }

      for (const listId of recentListIds) {
        let noticeData: CreateNoticeInput;
        try {
          noticeData = await getNoticeData({
            listId,
            deptCode,
            subDeptCode,
            departmentId: id,
          });
        } catch (error) {
          this.logger.error('get new notice data error', error.stack);
        }
        if (typeof noticeData !== 'undefined') {
          await this.noticeService.createNotice(noticeData);
        }
      }
      await this.departmentService.updateLastFetchedListId(
        id,
        recentListIds[0],
      );
    }
    this.logger.debug('scrapper end');
    this.schedulerRegistry.getCronJob(CRON_NAME).start();
  }
}
