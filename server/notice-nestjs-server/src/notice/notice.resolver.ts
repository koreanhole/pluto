import { Query, Resolver } from '@nestjs/graphql';
import { NoticeType } from './notice.type';

@Resolver(() => NoticeType)
export class NoticeResolver {
  @Query(() => NoticeType)
  notice() {
    return {
      listId: '123',
    };
  }
}
