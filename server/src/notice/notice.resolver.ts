import { Resolver, Query } from '@nestjs/graphql';
import { NoticeType } from './notice.type';
import { NoticeService } from './notice.service';

@Resolver(() => NoticeType)
export class NoticeResolver {
  constructor(private noticeService: NoticeService) {}

  @Query(() => NoticeType)
  allNotices() {
    return this.noticeService.getAllNotices();
  }
}
