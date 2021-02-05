import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NoticeType } from './notice.type';
import { NoticeService } from './notice.service';
import { CreateNoticeInput } from './notice.input';

@Resolver(() => NoticeType)
export class NoticeResolver {
  constructor(private noticeService: NoticeService) {}

  @Query(() => NoticeType)
  getNotice(@Args('id') id: string) {
    return this.noticeService.getNotice(id);
  }

  @Query(() => [NoticeType])
  async getPaginatedNotice(@Args('offset') offset: number) {
    return await this.noticeService.getPaginatedNotices(offset);
  }

  @Mutation(() => NoticeType)
  createNotice(
    @Args('createNoticeInput') createNoticeInput: CreateNoticeInput,
  ) {
    return this.noticeService.createNotice(createNoticeInput);
  }
}
