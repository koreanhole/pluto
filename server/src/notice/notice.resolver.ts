import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NoticeType } from './notice.type';
import { NoticeService } from './notice.service';
import { CreateNoticeInput } from './notice.input';

@Resolver(() => NoticeType)
export class NoticeResolver {
  constructor(private noticeService: NoticeService) {}

  @Query(() => NoticeType)
  async getNotice(@Args('id') id: string) {
    return await this.noticeService.getNotice(id);
  }

  @Query(() => [NoticeType])
  async getPaginatedNotice(@Args('offset') offset: number) {
    return await this.noticeService.getPaginatedNotices(offset);
  }

  @Query(() => [NoticeType])
  async getNoticeByDeptCode(
    @Args('deptCode') deptCode: string,
    @Args('offset') offset: number,
  ) {
    return await this.noticeService.getNoticeByDeptCode(deptCode, offset);
  }

  @Mutation(() => NoticeType)
  async createNotice(
    @Args('createNoticeInput') createNoticeInput: CreateNoticeInput,
  ) {
    return await this.noticeService.createNotice(createNoticeInput);
  }
}
