import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticeInput } from './notice.input';
import { Notice } from './notice.entity';
import { v4 as uuid } from 'uuid';

export const NOTICE_PAGINATED_BUNDLE_SIZE = 20;

@Injectable()
export class NoticeService {
  private logger = new Logger('NoticeService');
  constructor(
    @InjectRepository(Notice) private noticeRepository: Repository<Notice>,
  ) {}

  async getNotice(id: string): Promise<Notice> {
    try {
      return await this.noticeRepository.findOne({ id });
    } catch (error) {
      this.logger.error(`get notice by id: ${id} error`, error.stack);
    }
  }

  async getPaginatedNotices(
    limit: number,
    offset: number,
  ): Promise<[Notice[], number]> {
    try {
      const notices = await this.noticeRepository.findAndCount({
        skip: offset,
        take: limit,
        order: {
          createdDatetime: 'DESC',
          listId: 'DESC',
        },
      });
      return notices;
    } catch (error) {
      this.logger.error('get paginated all notice error', error.stack);
    }
  }

  async getPaginatedNoticeByDepartmentId(
    departmentId: string,
    limit: number,
    offset: number,
  ): Promise<[Notice[], number]> {
    try {
      return await this.noticeRepository.findAndCount({
        where: {
          department: departmentId,
        },
        skip: offset,
        take: limit,
        order: {
          createdDatetime: 'DESC',
          listId: 'DESC',
        },
      });
    } catch (error) {
      this.logger.error(
        `get notice by deptCode: ${departmentId} error`,
        error.stack,
      );
    }
  }

  async createNotice(createNoticeInput: CreateNoticeInput): Promise<Notice> {
    const {
      attachmentLinks,
      authorDept,
      authorName,
      contentHtml,
      contentString,
      createdDatetime,
      department,
      listId,
      title,
      url,
    } = createNoticeInput;
    const noticeId = uuid();
    const notice = this.noticeRepository.create({
      id: noticeId,
      attachmentLinks,
      authorDept,
      authorName,
      contentHtml,
      contentString,
      createdDatetime,
      department,
      listId,
      title,
      url,
    });

    try {
      const savedNotice = await this.noticeRepository.save(notice);
      this.logger.log(`create notice, url: ${url} departmentId: ${department}`);
      return savedNotice;
    } catch (error) {
      this.logger.error(
        `notice save error departmentId: ${department} listId: ${listId}`,
        error.stack,
      );
    }
  }
}
