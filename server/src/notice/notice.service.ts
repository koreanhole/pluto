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
    return this.noticeRepository.findOne({ id });
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
