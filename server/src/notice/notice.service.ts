import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticeInput } from './notice.input';
import { Notice } from './notice.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice) private noticeRepository: Repository<Notice>,
  ) {}

  async getNotice(id: string): Promise<Notice> {
    return await this.noticeRepository.findOne({ id });
  }

  async getPaginatedNotices(offset: number): Promise<Notice[]> {
    const bundleSize = 20;

    const notice = await this.noticeRepository.find({
      order: {
        createdDatetime: 'DESC',
      },
      skip: offset * bundleSize,
      take: bundleSize,
    });

    return notice;
  }

  async createNotice(createNoticeInput: CreateNoticeInput): Promise<Notice> {
    const {
      attachmentLinks,
      authorDept,
      authorName,
      contentHtml,
      contentString,
      createdDatetime,
      deptCode,
      deptName,
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
      deptCode,
      deptName,
      listId,
      title,
      url,
    });
    return this.noticeRepository.save(notice);
  }
}
