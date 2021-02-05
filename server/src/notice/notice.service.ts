import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticeInput } from './notice.input';
import { Notice } from './notice.entity';
import { v4 as uuid } from 'uuid';

const BUNDLE_SIZE = 20;

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice) private noticeRepository: Repository<Notice>,
  ) {}

  async getNotice(id: string): Promise<Notice> {
    return await this.noticeRepository.findOne({ id });
  }

  async getPaginatedNotices(offset: number): Promise<Notice[]> {
    const notice = await this.noticeRepository.find({
      order: {
        createdDatetime: 'DESC',
      },
      skip: offset * BUNDLE_SIZE,
      take: BUNDLE_SIZE,
    });

    return notice;
  }

  async getNoticeByDeptCode(
    deptCode: string,
    offset: number,
  ): Promise<Notice[]> {
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

    const notice = this.noticeRepository.create({
      id: uuid(),
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

    return await this.noticeRepository.save(notice);
  }
}
