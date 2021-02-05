import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NoticeType } from './notice.type';
import { NoticeService } from './notice.service';
import { CreateNoticeInput } from './inputs/notice.input';

@Resolver(() => NoticeType)
export class NoticeResolver {
  constructor(private noticeService: NoticeService) {}

  @Query(() => NoticeType)
  getNotice(@Args('id') id: string) {
    return this.noticeService.getNotice(id);
  }

  @Mutation(() => NoticeType)
  createNotice(
    @Args('createNoticeInput') createNoticeInput: CreateNoticeInput,
  ) {
    return this.noticeService.createNotice(createNoticeInput);
  }
}
