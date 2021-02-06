import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticeInput } from './notice.input';
import { Notice } from './notice.entity';
import { v4 as uuid } from 'uuid';

const BUNDLE_SIZE = 20;

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

  async getPaginatedNotices(offset: number): Promise<Notice[]> {
    try {
      const notice = await this.noticeRepository.find({
        order: {
          createdDatetime: 'DESC',
        },
        skip: offset * BUNDLE_SIZE,
        take: BUNDLE_SIZE,
      });
      return notice;
    } catch (error) {
      this.logger.error('get paginated all notice error', error.stack);
    }
  }

  async getNoticeByDeptCode(
    deptCode: string,
    offset: number,
  ): Promise<Notice[]> {
    try {
      return await this.noticeRepository.find({
        where: {
          deptCode,
        },
        order: {
          createdDatetime: 'DESC',
        },
        skip: offset * BUNDLE_SIZE,
        take: BUNDLE_SIZE,
      });
    } catch (error) {
      this.logger.error(
        `get notice by deptCode: ${deptCode} error`,
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
      this.logger.log(
        `create notice, noticeId: ${noticeId}, url: ${url} departmentId: ${department}`,
      );
      return savedNotice;
    } catch (error) {
      this.logger.error(
        `notice save error departmentId: ${department} listId: ${listId}`,
        error.stack,
      );
    }
  }
}
