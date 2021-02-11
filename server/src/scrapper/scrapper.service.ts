import { Injectable, Logger } from '@nestjs/common';
import { DepartmentService } from '../department/department.service';
import { NoticeService } from '../notice/notice.service';
import { getDepartmentLastListId, getNoticeData } from './scrapper.util';
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
      const lastListId = await getDepartmentLastListId({
        deptCode,
        subDeptCode,
        deptType,
      });
      if (lastListId === null) {
        return;
      }

      let currentListId = lastFetchedListId;

      this.schedulerRegistry.deleteInterval('scrapping');
      while (parseInt(currentListId) < parseInt(lastListId)) {
        currentListId = (parseInt(currentListId) + 1).toString();
        const noticeData = await getNoticeData({
          listId: currentListId,
          deptCode,
          subDeptCode,
          departmentId: id,
        });

        if (noticeData === null) {
          continue;
        }
        await this.noticeService.createNotice(noticeData);
        await this.departmentService.updateLastFetchedListId(
          id,
          noticeData.listId,
        );
      }
      this.schedulerRegistry.addInterval(
        'scrapping',
        setInterval(() => this.logger.debug('scrapper resumed'), 10000),
      );
    });
  }
}
